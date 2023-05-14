import {Injectable} from '@angular/core';
import {SocketService} from "./socket.service";
import SockJS from "sockjs-client";
import {HttpClient} from "@angular/common/http";
import {ServerService} from "../system/server.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private socketService: SocketService,
              private http: HttpClient,
              private server: ServerService) {
  }

  fetchUnreadGlobalNotifications() {
    this.http.get<any>('http://localhost:8080/api/v1/mq/notification/global', {
      headers: this.server.generateRequiredHeaders()
    }).subscribe({
      next: (val:any) => {
        console.log('avlue ', val)
      }
    })
  }
}
