import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerService} from "../system/server.service";
import {ServerLinks} from "../resource/ServerLinks.enum";
import {RoomDTO} from "../models/DTO/RoomDTO";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient,
              private server: ServerService) {
  }

  saveRoom(roomDTO: RoomDTO) {
    return this.http.post(this.server.prepareServerLink(ServerLinks.ROOM_CREATE_REQUEST), roomDTO, {headers: this.server.generateRequiredHeaders()})
  }
}
