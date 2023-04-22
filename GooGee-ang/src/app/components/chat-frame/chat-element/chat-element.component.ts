import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../service/models/Chat";

@Component({
  selector: 'app-chat-element',
  templateUrl: './chat-element.component.html',
  styleUrls: ['./chat-element.component.css']
})
export class ChatElementComponent implements OnInit{
  @Input("chat")
  userChat: Chat = new Chat();

  constructor() {
  }

  ngOnInit(): void {
  }
}
