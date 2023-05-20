import {AfterContentInit, Component, Input, OnInit} from '@angular/core';

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

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log('asdjknsajdjkasnksa', this.chat)
  }

  getChatAvatar() {
    return this.chat.avatar ? this.chat.avatar : "./assets/images/empty_avatar.jpg"
  }
}
