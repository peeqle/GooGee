import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
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

  @ViewChild("chatHolder")
  chatHolder: any;

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
    this.fetchChatMessages(() => {
      this.chatService.getSocketService().incomingChatMessagesObs.subscribe({
        next: message => {
          if (message.body) {
            this.chatMessages.push(this.mapToSimplifiedMessage(JSON.parse(message.body)));
          }
        }
      })
    });
    setTimeout(_ => this.scrollChatHolderToBottom());
  }

  onScroll() {
    this.page += 1;
    this.fetchChatMessages(() => {
    }, true);
  }

  subscribeOnChatEvents() {
    this.chatSubscription$ = this.chatService.subscribeOnChat();
  }

  fetchChatMessages(callback: any, toBeginning: boolean = false) {
    this.chatService.fetchChatMessages(this.page, this.limit).subscribe({
      next: value => {
        if (value) {
          for (let message of value) {
              this.chatMessages.unshift(this.mapToSimplifiedMessage(message));
          }
        }
      }, complete: () => {
        if (callback) {
          callback();
        }
      }
    })
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

  scrollChatHolderToBottom() {
    console.log('ASKDNKSNDSAkSJD')
    this.chatHolder.nativeElement.scrollTop = this.chatHolder.nativeElement.scrollHeight;
  }
}
