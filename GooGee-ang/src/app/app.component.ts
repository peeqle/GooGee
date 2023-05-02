import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {timeout} from "rxjs";
import {environment} from "../environments/environment.prod";
import {ChatService} from "./service/user/chat.service";
import {LocalStorageService} from "./service/system/local-storage.service";
import {TokenService} from "./service/system/token.service";
import {AuthService} from "./service/system/auth.service";
import {Router} from "@angular/router";

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
              private chatService: ChatService,
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
          this.authService.setUserAuthorized(json.success);

          this.localStorageService.save("tokens", {accessToken: json.accessToken, refreshToken: json.refreshToken})
          if (json.success) {
            this.chatService.connect();
            this.navigator.navigate(['/']).then(() => {
            });
          }
        }),
        error: ((err) => {
          if (err.status === 404) {
            console.log('Previous session info is not valid.')
          }
        }),
        complete: () => {
          console.log('complete')
        }
      })
    }
  }
}
