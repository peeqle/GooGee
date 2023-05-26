import {AfterContentInit, Component, Input, OnDestroy} from '@angular/core';
import {ChatService} from "../../../../../service/user/chat.service";
import {UserService} from "../../../../../service/user/user.service";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements AfterContentInit, OnDestroy {
  currentUser: any;

  message: string = "";

  chatMessages: any[] = [];

  chatSubscription$: any;

  constructor(private chatService: ChatService,
              private userService: UserService) {
  }

  sendMessage() {
    if (this.message) {
      this.chatService.sendChatMessage(this.message)
    }
    this.message = "";
  }

  ngAfterContentInit(): void {
    this.currentUser = this.userService.getCurrentUserInfo();
    this.subscribeOnChatEvents();

    this.chatService.getSocketService().incomingChatMessagesObs.subscribe({
      next: message => {
        if (message.body) {
          console.log('MESSAGE PUSH', message)
          this.chatMessages.push(this.mapToSimplifiedMessage(JSON.parse(message.body)));
        }
      }
    })
  }

  subscribeOnChatEvents() {
    this.chatSubscription$ = this.chatService.subscribeOnChat();
  }

  private mapToSimplifiedMessage(message) {
    return {
      id: message.id,
      sendAt: message.sendAt,
      isRead: message.isRead,
      content: atob(message.message.body),
      sender: message.message.messageProperties.userId
    }
  }

  ngOnDestroy(): void {
    this.chatSubscription$.unsubscribe();
  }
}
