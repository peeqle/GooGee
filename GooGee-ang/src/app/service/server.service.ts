import {Injectable} from '@angular/core';
import {ServerLinks} from "./resource/ServerLinks.enum";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor() {
  }

  prepareServerLink(linkPattern: ServerLinks) {
    return environment.server.url + linkPattern;
  }
}
