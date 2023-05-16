import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

  fetchRooms(page: number, limit: number) {
    return this.http.get(this.server.prepareServerLink(ServerLinks.ROOMS_USER_FETCH_REQUEST), {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams()
        .set("page", page)
        .set("limit", limit)
    })
  }
}
