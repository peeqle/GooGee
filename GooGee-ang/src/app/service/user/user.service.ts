import {Injectable} from '@angular/core';
import {LocalStorageService} from "../system/local-storage.service";
import {AppUser} from "../models/AppUser";
import {HttpClient} from "@angular/common/http";
import {ServerLinks} from "../resource/ServerLinks.enum";
import {ServerService} from "../system/server.service";
import {AppUserDTO} from "../models/DTO/AppUserDTO";

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

  generateAndSaveFromRegisterRequest(registerRequest: any) {
    let appUser = new AppUser();
    appUser.username = registerRequest.username;
    appUser.email = registerRequest.email;

    localStorage.setItem(`user-${appUser.username}`, JSON.stringify(appUser));
  }
}
