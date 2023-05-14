import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivityTab} from "../../../service/models/ActivityTab.enum";
import {ServerLinks} from "../../../service/resource/ServerLinks.enum";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {
  }


  getActivityTabFullData(activityTab: ActivityTab) {
    switch (activityTab) {
      case ActivityTab.CHAT:
        return {id: 1, name: "Chat", link: ServerLinks.CHATS_REQUEST, autoActive: false}
      case ActivityTab.ROOMS:
        return {id: 2, name: "Rooms", link: ServerLinks.ROOMS_REQUEST, autoActive: false}
      case ActivityTab.PROFILE:
        return {id: 3, name: "Profile", link: ServerLinks.USER_REQUEST, autoActive: false}
      case ActivityTab.SEARCH:
        return {id: 4, name: "Search", link: ServerLinks.SEARCH_REQUEST, autoActive: false}
      case ActivityTab.SETTINGS:
        return {id: 5, name: "Settings", link: ServerLinks.USER_REQUEST, autoActive: false}
    }
  }
}
