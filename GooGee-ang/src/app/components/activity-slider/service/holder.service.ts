import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HolderService {

  private currentActiveTabId: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  constructor() { }

  changeCurrentActiveTab(id: number) {
    this.currentActiveTabId.next(id);
    return id;
  }

  get currentActiveTabIndex() {
    return this.currentActiveTabId.asObservable();
  }

  getCurrentTabValue() {
    return this.currentActiveTabId.value;
  }
}
