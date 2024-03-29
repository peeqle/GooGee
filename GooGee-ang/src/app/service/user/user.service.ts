import {Injectable} from '@angular/core';
import {LocalStorageService} from "../system/local-storage.service";
import {AppUser} from "../models/AppUser";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ServerLinks} from "../resource/ServerLinks.enum";
import {ServerService} from "../system/server.service";
import {AppUserDTO} from "../models/DTO/AppUserDTO";
import {Subject} from "rxjs";
import {ImageService} from "../system/image.service";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorageService: LocalStorageService,
              private http: HttpClient,
              private server: ServerService) {
  }

  fetchCurrentUserInfo() {
    return this.http.get<AppUserDTO>(this.server.prepareServerLink(ServerLinks.USER_CURRENT_REQUEST), {
      headers: this.server.generateRequiredHeaders()
    })
  }

  fetchUserInfo(userId: any) {
    return this.http.get<AppUserDTO>(this.server.prepareServerLink(ServerLinks.USER_FETCH_REQUEST), {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams()
        .set("userId", userId)
    })
  }

  updateUserInfo(userInfo: any) {
    return this.http.put(this.server.prepareServerLink(ServerLinks.USER_CURRENT_UPDATE), userInfo, {
      headers: this.server.generateRequiredHeaders()
    })
  }

  updateUserAdditionalInfo(addInfo: any) {
    return this.http.put(this.server.prepareServerLink(ServerLinks.USER_CURRENT_UPDATE_ADDITIONAL), addInfo, {
      headers: this.server.generateRequiredHeaders()
    })
  }

  fetchUserFriends(userId: number) {
    return this.http.get(this.server.prepareServerLink(ServerLinks.USER_FETCH_FRIENDS_REQUEST), {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams()
        .set("userId", userId)
    })
  }

  generateAndSaveFromRegisterRequest(registerRequest: any) {
    let appUser = new AppUser();
    appUser.username = registerRequest.username;
    appUser.email = registerRequest.email;

    localStorage.setItem(`user`, JSON.stringify(appUser));
  }

  getCurrentUserInfo() {
    return this.localStorageService.fetch("user");
  }
}
