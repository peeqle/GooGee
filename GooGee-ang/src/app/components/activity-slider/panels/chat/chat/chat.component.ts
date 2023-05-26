import {AfterContentInit, Component, OnInit} from '@angular/core';
import {CommonActivity} from "../../CommonActivity";
import {HolderService} from "../../../service/holder.service";
import {NotificationService} from 'src/app/service/user/notification.service';
import {ServerService} from 'src/app/service/system/server.service';
import {UserService} from 'src/app/service/user/user.service';
import {ActivityTab} from 'src/app/service/models/ActivityTab.enum';
import {ChatService} from "../../../../../service/user/chat.service";
import {logCumulativeDurations} from "@angular-devkit/build-angular/src/builders/browser-esbuild/profiling";

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

  currentSelectedChat: any = null;

  page: any = 0;

  limit: any = 15;

  ngAfterContentInit(): void {
    this.chatService.fetchUserChats(this.page, this.limit).subscribe({
      next: value => {
        if (value) {
          // @ts-ignore
          value.forEach(chat => {
            this.chats.push(chat);
          })
        }
      }
    })

    this.tabHolder.chatSelectedChatUserObs.subscribe({
      next: user => {
        if (user && this.tabHolder.getCurrentTabValue() === ActivityTab.CHAT) {
          if(!this.checkUsername(user)) {
            this.createChat(user);
          }
        }
      }
    })
  }

  createChat(user) {
    this.chatService.createNewChat(user).subscribe({
      next: value => {
        this.chats.push(value)

        this.currentSelectedChat = value
      }
    })
  }

  setEmittedChat(chat: any) {
    this.currentSelectedChat = chat;
    this.chatService.changeSelectedChat(chat)
  }

  checkUsername(user: any) {
    let privateChats = this.chats.filter(chat => chat.privateRoom);
    for (let chat of privateChats) {
      if (chat.memberUsernames.indexOf(user.username) !== -1) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
  }
}
