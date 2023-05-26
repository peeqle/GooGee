import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ServerService} from "./server.service";
import {ServerLinks} from "../resource/ServerLinks.enum";
import {Subject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  profileImageURL: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient,
              private server: ServerService,
              private sanitizer: DomSanitizer,
              private localStorage: LocalStorageService) {
  }

  uploadImage(mediaFile) {
    const data: FormData = new FormData();
    data.append('mediaFile', mediaFile);
    return this.http.post<any>(this.server.prepareServerLink(ServerLinks.MEDIA_SAVE), data, {
      headers: this.server.generateRequiredHeaders()
    })
  }

  fetchUserImage() {
    let currentUser = this.localStorage.fetch("user");
    this.fetchImage(currentUser.imageKey).subscribe({
      next: value => {
        let objectURL = URL.createObjectURL(value);
        this.profileImageURL.next(this.sanitizer.bypassSecurityTrustUrl(objectURL));
      }
    })
  }

  fetchImage(imageKey) {
    return this.http.get(this.server.prepareServerLink(ServerLinks.MEDIA_FETCH), {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams()
        .set("mediaKey", imageKey),
      responseType: 'blob'
    })
  }
}
