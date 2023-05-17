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

  page: any = 1;

  limit: any = 15;

  ngAfterContentInit(): void {
    this.chatService.fetchUserChats(this.page, this.limit).subscribe({
      next: value => {
        if(value) {
          console.log('value', value)
          // @ts-ignore
          value.content.forEach(chat => {
            this.chats.push(chat);
          })
        }
        console.log('this chats', this.chats)
      }
    })

    this.tabHolder.chatSelectedUserObs.subscribe({
      next: value => {
        if (value && this.tabHolder.getCurrentTabValue() === ActivityTab.CHAT) {
          this.chats.push(value)
        }
      }
    })
  }

  ngOnInit(): void {
  }
}
