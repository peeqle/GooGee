import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {ServerService} from "./server.service";
import {ServerLinks} from "../resource/ServerLinks.enum";
import {UserService} from "../user/user.service";
import {SnackService} from "../snack.service";
import {AuthenticationRequest} from "../models/AuthorizationRequest";
import {SocketService} from "../user/socket.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
              private http: HttpClient,
              private localStorageService: LocalStorageService,
              private server: ServerService,
              private userService: UserService,
              private socketService: SocketService,
              private snack: SnackService) {
  }

  isUserAuthorized() {
    return this.userAuthorized.getValue();
  }

  getUserAuthorization() {
    return this.userAuthorized.asObservable();
  }

  setUserAuthorized(value: boolean) {
    this.userAuthorized.next(value);
    return value;
  }

  login(loginRequest: any) {
    let this$ = this;
    this.http.post<AuthenticationRequest>(this.server.prepareServerLink(ServerLinks.LOGIN_REQUEST), loginRequest).subscribe({
      next: (nxt) => {
        if (nxt.success) {
          this.userAuthorized.next(nxt.success);
          this.localStorageService.save("tokens", {
            accessToken: nxt.accessToken,
            refreshToken: nxt.refreshToken
          })
          // хз оставлять ли сохранение в локале профиля, в любом случае TODO
          // this.userService.generateAndSaveFromRegisterRequest(registerRequest);
          this$.router.navigate(['/']).then(() => {
            this.socketService.connect();
          })
        }
      },
      error: (err) => {
        this$.snack.loginRequestError()
      },
      complete: () => {

      }
    })
  }

  logout() {
    this.http.get(this.server.prepareServerLink(ServerLinks.LOGOUT_REQUEST), {
      headers: this.server.generateRequiredHeaders()
    }).subscribe({
      next: (json) => {
      }
    })
  }

  register(registerRequest: any) {
    this.http.post(this.server.prepareServerLink(ServerLinks.REGISTER_REQUEST), registerRequest).subscribe(
      (res) => {
        this.localStorageService.save('tokens', res);
        this.userService.generateAndSaveFromRegisterRequest(registerRequest);
        this.setUserAuthorized(true);
      },
      () => {
        this.snack.registerRequestError();
      },
      () => {
        if (this.isUserAuthorized()) {
          this.router.navigate(['']).then();
        }
      }
    )
  }

  exchangeCode(code: any) {
    return this.http.post("http://localhost:8080/oauth/github/exchange", {}, {
      params: new HttpParams().set("code", code)
    })
  }
}

