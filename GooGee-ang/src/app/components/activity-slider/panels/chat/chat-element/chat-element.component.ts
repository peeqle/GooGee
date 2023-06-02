import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from "../../../../../service/user/chat.service";

@Component({
  selector: 'app-chat-element',
  templateUrl: './chat-element.component.html',
  styleUrls: ['./chat-element.component.css']
})
export class ChatElementComponent implements OnInit, AfterContentInit {

  @Input("chatElement")
  chat: any;

  @Input("full")
  full: boolean = true;

  @Output("selectChat")
  chatEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  getChatAvatar() {
    return this.chat.avatar ? this.chat.avatar : "./assets/images/empty_avatar.jpg"
  }

  emitChat() {
    this.chatService.changeSelectedChat(this.chat)
  }
}
