import {Component} from '@angular/core';
import {Chat} from "../../../service/models/Chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userChats: Chat[] = [new Chat()]
}
