import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ServerService} from '../system/server.service';
import {ServerLinks} from "../resource/ServerLinks.enum";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient,
              private server: ServerService) {
  }

  fetchUserChats(page: any, limit: any) {
    return this.http.get(this.server.prepareServerLink(ServerLinks.CHAT_FETCH_REQUEST), {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams()
        .set("page", page)
        .set("limit", limit)
    })
  }

  createNewChat(user) {
    return this.http.post(this.server.prepareServerLink(ServerLinks.CHAT_CREATE_ROOM_REQUEST), user, {
      headers: this.server.generateRequiredHeaders()
    })
  }
}
