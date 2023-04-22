import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ServerLinks} from "./resource/ServerLinks.enum";
import {ServerService} from "./server.service";
import {AuthenticationRequest} from "./models/AuthorizationRequest";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient,
              private server: ServerService) {
  }

  checkAndRefreshTokens(refreshToken: string) {
    return this.http.post<AuthenticationRequest>(this.server.prepareServerLink(ServerLinks.TOKEN_REFRESH_REQUEST), {}, {
      params: new HttpParams().set("refreshToken", refreshToken)
    });
  }
}
