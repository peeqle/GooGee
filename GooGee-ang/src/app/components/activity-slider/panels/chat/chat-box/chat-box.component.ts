import {AfterContentInit, Component, OnDestroy} from '@angular/core';
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

  page: number = 0;
  limit: number = 30;

  constructor(private chatService: ChatService,
              private userService: UserService) {
  }

  sendMessage() {
    if (this.message) {
      this.chatService.sendChatMessage(this.message)
    }
  }

  ngAfterContentInit(): void {
    this.currentUser = this.userService.getCurrentUserInfo();
    this.subscribeOnChatEvents();

    this.chatService.fetchChatMessages(this.page, this.limit).subscribe({
      next: value => {
        if (value) {
          for (let message of value.content) {
            this.chatMessages.push(this.mapToSimplifiedMessage(message));
          }
        }
      }, complete: () => {
        this.chatService.getSocketService().incomingChatMessagesObs.subscribe({
          next: message => {
            if (message.body) {
              this.chatMessages.push(this.mapToSimplifiedMessage(JSON.parse(message.body)));
            }
          }
        })
      }
    })
  }

  subscribeOnChatEvents() {
    this.chatSubscription$ = this.chatService.subscribeOnChat();
  }

  fetchChatMessages() {

  }

  private mapToSimplifiedMessage(message) {
    return {
      id: message.id,
      sendAt: message.sendAt,
      isRead: message.isRead,
      content: atob(message.message.content),
      sender: message.message.userId
    }
  }

  ngOnDestroy(): void {
    this.chatSubscription$.unsubscribe();
  }
}
