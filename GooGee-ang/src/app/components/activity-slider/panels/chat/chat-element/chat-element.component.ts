import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  getChatAvatar() {
    return this.chat.avatar ? this.chat.avatar : "./assets/images/empty_avatar.jpg"
  }

  emitChat() {
    this.chatEmitter.emit(this.chat);
  }
}
