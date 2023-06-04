import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from "../../../../../service/user/chat.service";
import {ImageService} from "../../../../../service/system/image.service";
import {verifyHostBindings} from "@angular/compiler";
import {DomSanitizer} from "@angular/platform-browser";

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

  @Input("currentUser")
  currentUser: any;

  @Output("selectChat")
  chatEmitter: EventEmitter<any> = new EventEmitter<any>();

  chatImage: any = "./assets/images/empty_avatar.jpg";

  constructor(private chatService: ChatService,
              private imageService: ImageService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.getChatAvatar();
  }

  getChatAvatar() {
    if (this.chat.privateRoom) {
      let targetMember = this.chat.members.filter(user => user.username !== this.currentUser.username)[0];
      this.imageService.fetchImage(targetMember.imageKey).subscribe({
        next: value => {
          let objectURL = URL.createObjectURL(value);
          this.chatImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      })
    }else {
      this.chatImage = this.chat.avatar ? this.chat.avatar : "./assets/images/empty_avatar.jpg"
    }
  }

  getChatName() {
    if (this.chat.privateRoom) {
      let targetMember = this.chat.members.filter(user => user.username !== this.currentUser.username)[0];
      return targetMember.username;
    }
    return this.chat.chatName;
  }

  emitChat() {
    this.chatService.changeSelectedChat(this.chat)
  }
}
