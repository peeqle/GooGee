import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ServerService} from "../system/server.service";
import {ServerLinks} from "../resource/ServerLinks.enum";
import {RoomDTO} from "../models/DTO/RoomDTO";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  creatorRooms: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  memberRooms: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

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

  getCreatorRooms() {
    return this.creatorRooms.asObservable();
  }

  getMemberRooms() {
    return this.memberRooms.asObservable();
  }

  appendRoom(room: any, target: string) {
    if(target === "CREATOR") {
      const currentValue = this.creatorRooms.value;
      const updatedValue = [...currentValue, room];
      this.creatorRooms.next(updatedValue);
    }else {
      const currentValue = this.memberRooms.value;
      const updatedValue = [...currentValue, room];
      this.memberRooms.next(updatedValue);
    }
  }

  appendRooms(rooms: any = [], target: string) {
    if(target === "CREATOR") {
      let currentValue = this.creatorRooms.value;
      rooms.forEach(item => {
        currentValue.push(item)
      })
      this.creatorRooms.next(currentValue);
    }else {
      let currentValue = this.memberRooms.value;
      rooms.forEach(item => {
        currentValue.push(item)
      })
      this.memberRooms.next(currentValue);
    }
  }
}
