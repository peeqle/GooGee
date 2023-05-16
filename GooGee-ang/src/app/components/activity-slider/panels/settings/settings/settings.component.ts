import { Component } from '@angular/core';
import {CommonActivity} from "../../CommonActivity";
import {AuthService} from "../../../../../service/system/auth.service";
import {LocalStorageService} from "../../../../../service/system/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends CommonActivity{

  constructor(private authService: AuthService,
              private localService: LocalStorageService,
              private router: Router) {
    super();
  }
  logout() {
    this.authService.logout();
    this.localService.removeTokens();
    this.router.navigate(['/login']);
  }
}
