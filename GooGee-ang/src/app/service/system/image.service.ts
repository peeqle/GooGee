import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ServerService} from "./server.service";
import {ServerLinks} from "../resource/ServerLinks.enum";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
              private server: ServerService) {
  }

  uploadImage(mediaFile) {
    const data: FormData = new FormData();
    data.append('mediaFile', mediaFile);
    return this.http.post<any>(this.server.prepareServerLink(ServerLinks.MEDIA_SAVE), data, {
      headers: this.server.generateRequiredHeaders()
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
