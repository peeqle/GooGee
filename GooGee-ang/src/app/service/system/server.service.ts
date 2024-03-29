import {Injectable} from '@angular/core';
import {ServerLinks} from "../resource/ServerLinks.enum";
import {environment} from "../../../environments/environment.prod";
import {LocalStorageService} from "./local-storage.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private localStorageService: LocalStorageService) {
  }

  generateRequiredHeaders() {
    let tokens = this.localStorageService.fetchTokens();
    if (tokens != null) {
      // @ts-ignore
      return new HttpHeaders().set("Authorization", `Bearer ${tokens.accessToken}`);

    }
    return new HttpHeaders();
  }

  prepareServerLink(linkPattern: ServerLinks) {
    return environment.server.url + environment.server.prefix + linkPattern;
  }
}
