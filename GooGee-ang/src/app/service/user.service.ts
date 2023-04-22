import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {AppUser} from "./models/AppUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorageService: LocalStorageService) {
  }

  generateAndSaveFromRegisterRequest(registerRequest: any) {
    let appUser = new AppUser();
    appUser.username = registerRequest.username;
    appUser.email = registerRequest.email;

    localStorage.setItem(`user-${appUser.username}`, JSON.stringify(appUser));
  }
}
