import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chat-element',
  templateUrl: './chat-element.component.html',
  styleUrls: ['./chat-element.component.css']
})
export class ChatElementComponent {

  @Input("chatElement")
  chat: any;
}
