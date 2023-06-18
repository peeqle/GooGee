import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {timeout} from "rxjs";
import {environment} from "../environments/environment.prod";
import {SocketService} from "./service/user/socket.service";
import {LocalStorageService} from "./service/system/local-storage.service";
import {TokenService} from "./service/system/token.service";
import {AuthService} from "./service/system/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "./service/user/notification.service";
import {UserService} from "./service/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'GooGee-ang';

  rendered: boolean = false;

  constructor(private renderer: Renderer2,
              private localStorageService: LocalStorageService,
              private tokenService: TokenService,
              private authService: AuthService,
              private userService: UserService,
              private socketService: SocketService,
              private notificationService: NotificationService,
              private navigator: Router) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.rendered = true;
      let loader = this.renderer.selectRootElement('#loader');
      this.renderer.setStyle(loader, 'display', 'none');
    }, environment.logoPanelTimeout)
  }

  ngOnInit() {
    let tokens = this.localStorageService.fetch("tokens");

    if (tokens) {
      let refreshToken = tokens.refreshToken;
      this.tokenService.checkAndRefreshTokens(refreshToken).subscribe({
        next: ((json) => {
          console.log('tokens', json)
          this.authService.setUserAuthorized(json.success);

          if (json.success) {
            this.localStorageService.save("tokens", {accessToken: json.accessToken, refreshToken: json.refreshToken})

            this.userService.fetchCurrentUserInfo().subscribe({
              next: value => {
                this.localStorageService.save("user", value)
              }
            })
            this.connectSockets();
          }
        }),
        error: ((err) => {
          if (err.status === 404) {
          }
        })
      })
    }
  }

  public static getEditorKey() {
    return environment.editorKey;
  }

  private connectSockets() {
    this.socketService.connect();
    this.navigator.navigate(['/']).then(() => {
      this.notificationService.fetchUnreadGlobalNotifications();
    });
  }
}
