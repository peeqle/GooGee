import {AfterContentInit, Component, OnChanges, SimpleChanges} from '@angular/core';
import {CommonActivity} from "../../CommonActivity";
import {AuthService} from "../../../../../service/system/auth.service";
import {LocalStorageService} from "../../../../../service/system/local-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../../service/user/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends CommonActivity implements AfterContentInit, OnChanges {

  currentUserAdditionalInfo: any = {};

  anythingChanged: boolean = false;

  constructor(private authService: AuthService,
              private localService: LocalStorageService,
              private userService: UserService,
              private router: Router) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
  }

  logout() {
    this.authService.logout();
    this.localService.removeTokens();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  ngAfterContentInit(): void {
    let appUserInfo = this.userService.getCurrentUserInfo();
    if (appUserInfo) {
      this.currentUserAdditionalInfo = appUserInfo.appUserAdditionalInfo;
    }
    console.log('cjusdusususu', this.currentUserAdditionalInfo)
  }

  updateInfo() {
    this.userService.updateUserAdditionalInfo(this.currentUserAdditionalInfo).subscribe({
      next: value => {
        this.localService.save("user", value)
      },
      complete: () => {

      }
    })
  }
}
