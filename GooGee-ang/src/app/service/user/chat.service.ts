import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ServerService} from '../system/server.service';
import {ServerLinks} from "../resource/ServerLinks.enum";
import {SocketService} from "./socket.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatSelected: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private http: HttpClient,
              private server: ServerService,
              private socketService: SocketService) {
  }

  getSocketService() {
    return this.socketService;
  }

  fetchUserChats(page: any, limit: any) {
    return this.http.get(this.server.prepareServerLink(ServerLinks.CHAT_FETCH_REQUEST), {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams()
        .set("page", page)
        .set("limit", limit)
    })
  }

  fetchChatMessages(page: number, limit: number) {
    return this.http.get<any>(this.server.prepareServerLink(ServerLinks.CHAT_FETCH_MESSAGES_REQUEST), {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams()
        .set("page", page)
        .set("limit", limit)
        .set("chatId", this.getSelectedChat().chatId)
    })
  }

  createNewChat(user) {
    return this.http.post(this.server.prepareServerLink(ServerLinks.CHAT_CREATE_ROOM_REQUEST), user, {
      headers: this.server.generateRequiredHeaders()
    })
  }

  sendChatMessage(message: any) {
    this.socketService.sendChatMessage(message, this.getSelectedChat())
  }

  get chatSelectedObs() {
    return this.chatSelected.asObservable();
  }

  changeSelectedChat(chat: any) {
    this.chatSelected.next(chat);
    return chat;
  }

  getSelectedChat() {
    return this.chatSelected.value;
  }

  subscribeOnChat() {
    return this.socketService.subscribeOnChatMessages(this.getSelectedChat().chatId)
  }

  unsubscribeFromChat() {

  }
}
