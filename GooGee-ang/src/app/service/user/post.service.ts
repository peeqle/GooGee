import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostDTO} from "../models/DTO/PostDTO";
import {ServerService} from "../system/server.service";
import {ServerLinks} from "../resource/ServerLinks.enum";
import {TokenService} from "../system/token.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private server: ServerService) {
  }

  save(post: PostDTO) {
    return this.http.post<PostDTO>(this.server.prepareServerLink(ServerLinks.USER_POST_REQUEST), post, {headers: this.server.generateRequiredHeaders()})
  }
}
