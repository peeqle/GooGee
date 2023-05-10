import { Injectable } from '@angular/core';
import {SocketService} from "./socket.service";
import SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private socketService:SocketService) { }


}
