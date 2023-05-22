import {AfterContentInit, Component, Input} from '@angular/core';
import {ChatService} from "../../../../../service/user/chat.service";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements AfterContentInit {
  message: string = "";

  constructor(private chatService: ChatService) {
  }

  sendMessage() {
    if (this.message) {
      this.chatService.sendChatMessage(this.message)
    }
    this.message = "";
  }

  ngAfterContentInit(): void {

  }
}
