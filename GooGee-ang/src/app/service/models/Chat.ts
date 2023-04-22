import {ActivityStatus} from "./ActivityStatus.enum";

export class Chat {

  private chatName: string | undefined;

  private lastMessage: string | undefined;

  private chatStatus: ActivityStatus = ActivityStatus.DISABLED;

  private newMessageForUser: boolean = false;

  private amountOfNewMessages: number = 0;

  private currentUserIsChatOwner: boolean = false;

  private systemChat: boolean = false;

  private visibleForUser: boolean = true;

  constructor() {
  }

  setChatName(chatName: string) {
    this.chatName = chatName;
  }

  setLastMessage(lastMessage: string) {
    this.lastMessage = lastMessage;
  }

  setChatStatus(chatStatus: ActivityStatus) {
    this.chatStatus = chatStatus;
  }

  setNewMessageForUser(newMessageForUser: boolean) {
    this.newMessageForUser = newMessageForUser;
  }

  setAmountOfNewMessages(amountOfNewMessages: number) {
    this.amountOfNewMessages = amountOfNewMessages;
  }
}
