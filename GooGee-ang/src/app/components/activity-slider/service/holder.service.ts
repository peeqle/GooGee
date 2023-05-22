import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HolderService {

  private currentActiveTabId: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  private chatSelectedUser: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor() {
  }

  changeCurrentActiveTab(id: number) {
    this.currentActiveTabId.next(id);
    return id;
  }

  get currentActiveTabObs() {
    return this.currentActiveTabId.asObservable();
  }

  getCurrentTabValue() {
    return this.currentActiveTabId.value;
  }

  changeSelectedChatUser(user: any) {
    this.chatSelectedUser.next(user);
    return user;
  }

  get chatSelectedChatUserObs() {
    return this.chatSelectedUser.asObservable();
  }

  getSelectedChatUser() {
    return this.chatSelectedUser.value;
  }
}
