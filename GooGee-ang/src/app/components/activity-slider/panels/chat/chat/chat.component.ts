import {AfterContentInit, Component, OnInit} from '@angular/core';
import {CommonActivity} from "../../CommonActivity";
import {HolderService} from "../../../service/holder.service";
import {NotificationService} from 'src/app/service/user/notification.service';
import {ServerService} from 'src/app/service/system/server.service';
import {UserService} from 'src/app/service/user/user.service';
import {ActivityTab} from 'src/app/service/models/ActivityTab.enum';
import {ChatService} from "../../../../../service/user/chat.service";
import {Observable, tap} from "rxjs";
import {offset} from "@popperjs/core";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent extends CommonActivity implements OnInit, AfterContentInit {

  constructor(private tabHolder: HolderService,
              private userService: UserService,
              private chatService: ChatService,
              private serverService: ServerService,
              private notificationService: NotificationService) {
    super();
  }

  chats: Array<any> = new Array<any>();

  page: any = 0;

  limit: any = 15;

  ngAfterContentInit(): void {
    this.chatService.fetchUserChats(this.page, this.limit).subscribe({
      next: value => {
        console.log('value', value)
        if (value) {
          // @ts-ignore
          value.content.forEach(chat => {
            this.chats.push(chat);
          })
        }
      }
    })

    this.tabHolder.chatSelectedUserObs.subscribe({
      next: user => {
        if (user && this.tabHolder.getCurrentTabValue() === ActivityTab.CHAT) {
          console.log('this.chats', this.chats)
          if (!this.chats.filter(chat => chat.privateRoom).map(chat => chat.chatName).includes(user.username)) {
            this.createUserChat(user)
          }
        }
      }
    })
  }

  createUserChat(user) {
    this.chatService.createNewChat(user).subscribe({
      next: value => {
        this.chats.push(value)
      }
    })
  }

  ngOnInit(): void {
  }
}
