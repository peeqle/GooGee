import {Injectable} from '@angular/core';
import SockJS from "sockjs-client";
import * as Stomp from 'stompjs';
import {Observable, Observer} from "rxjs";
import {LocalStorageService} from "../system/local-storage.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public stomp: any;

  private socket: any;

  private frame: any = {};

  constructor(private storageService: LocalStorageService, private userService: UserService) {
  }

  public connect(): void {
    this.create();
    if (this.socket.status !== SockJS.OPEN) {
      this.stomp = Stomp.over(this.socket);
      const _this = this;
      _this.stomp.connect({}, function (frame) {
        _this.frame = frame;
        if (_this.socket.readyState === WebSocket.OPEN) {
          _this.sendSubscribeNotificationRequest()
        }
        _this.stomp.reconnect_delay = 2000;
      }, () => {
        //error callback
      });
    }
  }

  private create() {
    this.socket = new SockJS("http://127.0.0.1:8080/ws", {})
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      this.socket.onmessage = obs.next.bind(obs);
      this.socket.onerror = obs.error.bind(obs);
      this.socket.onclose = obs.complete.bind(obs);
      return this.socket.close.bind(this.socket);
    });
    let observer = {
      error: null,
      complete: null,
      next: (data: Object) => {

      }
    };
  }

  public disconnect() {
    if (this.stomp !== null) {
      this.stomp.disconnect();
    }
  }

  public sendMessage(message: string, chat_id: string, file: any) {
    this.stomp.send(`/topic/chat.${chat_id}.messages.all.send`, {
      'file': file
    }, message)
  }

  public subscribeOnChatMessages(chat_id: string) {
    this.stomp.subscribe(`/topic/chat.${chat_id}.messages`, (message: any) => {
    });
  }

  public sendSubscribeNotificationRequest() {
    this.stomp.send(`/topic/notifications.global.subscribe.${this.frame.headers.session}`, (message: any) => {
      console.log('message', message)
    });

    this.stomp.subscribe(`/topic/notifications.global`, (message: any) => {
      console.log('message', message)
    });
  }

  public updateUserLocation(geoData: any) {
    let geoObj = {
      latitude: geoData.coords.latitude,
      longitude: geoData.coords.longitude,
      accuracy: geoData.coords.accuracy,
      speed: geoData.coords.speed
    }

    let currentUserInfo = this.userService.getCurrentUserInfo()

    this.stomp.send(`/topic/geolocation.update`, {
        'currentLocation': JSON.stringify(geoObj),
        'username': currentUserInfo.username
      },
      (message: any) => {
        console.log('message', message)
      });
  }
}