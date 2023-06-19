import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';
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

  messagesSubscription$: any;

  @ViewChild("chatHolder")
  chatHolder: any;


  chatName: string = "";

  @HostListener("window:keydown.enter", ['$event'])
  enterClick = () => {
    this.sendMessage();
  }

  page: number = 0;
  limit: number = 30;

  constructor(private chatService: ChatService,
              private userService: UserService) {
  }

  sendMessage() {
    if (this.message) {
      this.chatService.sendChatMessage(this.message)
    }
    this.message = ""
  }

  ngAfterContentInit(): void {
    this.currentUser = this.userService.getCurrentUserInfo();
    this.chatService.chatSelectedObs.subscribe({
      next: value => {
        this.chatName = value.chatName
        this.clearChatBox();
        if (this.messagesSubscription$) {
          this.messagesSubscription$.unsubscribe();
        }
        if (this.chatSubscription$) {
          this.chatSubscription$.unsubscribe();
        }
        this.prepareChatBox();
      }
    })
  }

  prepareChatBox() {
    this.subscribeOnChatEvents();
    this.fetchChatMessages(() => {
      this.messagesSubscription$ = this.chatService.getSocketService().incomingChatMessagesObs.subscribe({
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
    const decoder = new TextDecoder("utf-8")
    let content = atob(message.message.content);
    let byteArray = new Uint8Array(content.length);
    for (let i = 0; i < content.length; i++) {
      byteArray[i] = content.charCodeAt(i);
    }
    return {
      id: message.id,
      sendAt: message.sendAt,
      isRead: message.isRead,
      content: decoder.decode(byteArray),
      senderUsername: message.message.senderUsername,
      sender: message.message.userId
    }
  }

  ngOnDestroy(): void {
    this.chatSubscription$.unsubscribe();
  }

  scrollChatHolderToBottom() {
    setTimeout(() => {
      this.chatHolder.nativeElement.scrollTop = this.chatHolder.nativeElement.scrollHeight;
    }, 100)
  }

  clearChatBox() {
    this.chatMessages = []
    this.message = ""
    this.page = 0;
  }
}
