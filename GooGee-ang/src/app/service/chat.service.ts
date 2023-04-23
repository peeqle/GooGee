import {Injectable} from '@angular/core';
import SockJS from "sockjs-client";
import * as Stomp from 'stompjs';
import {Observable, Observer} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public stomp: any;

  private socket: any;

  constructor(private storageService: LocalStorageService) {
  }

  public connect(): void {
    this.create();
    if (this.socket.status !== SockJS.OPEN) {
      this.stomp = Stomp.over(this.socket);
      const _this = this;
      _this.stomp.connect({
        headers: {
          'Authorization': 'Bearer myAuthToken'
        }
      }, function () {
        if (_this.socket.readyState === WebSocket.OPEN) {

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
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(data));
        }
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
}
