import {AfterContentInit, ApplicationRef, Component, ComponentRef, OnChanges, SimpleChanges} from '@angular/core';
import {CommonActivity} from "../../CommonActivity";
import {AuthService} from "../../../../../service/system/auth.service";
import {LocalStorageService} from "../../../../../service/system/local-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../../service/user/user.service";
import {AppComponent} from "../../../../../app.component";

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
              private router: Router,
              private appRef: ApplicationRef) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  logout() {
    this.authService.logout();
    this.localService.removeTokens();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
      const rootComponents = this.appRef.components;
      const rootComponentRef: ComponentRef<any> = rootComponents[0];
      this.appRef.detachView(rootComponentRef.hostView);
      rootComponentRef.destroy();
      this.appRef.bootstrap(AppComponent);
    });
  }

  ngAfterContentInit(): void {
    let appUserInfo = this.userService.getCurrentUserInfo();
    if (appUserInfo) {
      this.currentUserAdditionalInfo = appUserInfo.appUserAdditionalInfo;
    }
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
