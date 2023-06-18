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

  saveRoom(roomDTO: RoomDTO, editMode: boolean = false) {
    console.log('this.room', roomDTO)
    return this.http.post(this.server.prepareServerLink(ServerLinks.ROOM_CREATE_REQUEST), roomDTO, {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams().set("editMode", editMode)
    })
  }

  fetchRooms(page: number, limit: number) {
    return this.http.get(this.server.prepareServerLink(ServerLinks.ROOMS_USER_FETCH_REQUEST), {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams()
        .set("page", page)
        .set("limit", limit)
    })
  }

  fetchRoomById(roomId: number) {
    return this.http.get(this.server.prepareServerLink(ServerLinks.ROOM_FETCH_REQUEST), {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams()
        .set("roomId", roomId)
    })
  }

  deleteRoomById(uuid: any) {
    return this.http.delete(this.server.prepareServerLink(ServerLinks.ROOMS_DELETE_REQUEST), {
      headers: this.server.generateRequiredHeaders(),
      params: new HttpParams()
        .set("roomId", uuid)
    })
  }

  getCreatorRooms() {
    return this.creatorRooms.asObservable();
  }

  getMemberRooms() {
    return this.memberRooms.asObservable();
  }

  appendRoom(room: any, target: string, edit: boolean) {
    if (target === "CREATOR") {
      let currentValue = this.creatorRooms.value;
      let updatedValue = [];
      if (edit) {
        let roomIndex = currentValue.findIndex(el => el.uuid === room.uuid);
        currentValue[roomIndex] = room;
        updatedValue = currentValue;
      } else {
        updatedValue = [...currentValue, room];
      }
      this.creatorRooms.next(updatedValue);
    } else {
      const currentValue = this.memberRooms.value;
      const updatedValue = [...currentValue, room];
      this.memberRooms.next(updatedValue);
    }
  }

  removeRoom(roomId: any) {
    let currentValue = this.creatorRooms.value;
    let roomIndex = currentValue.findIndex(room => room.uuid === roomId);
    currentValue.splice(roomIndex, 1);
    this.creatorRooms.next(currentValue);
  }

  appendRooms(rooms: any = [], target: string) {
    if (target === "CREATOR") {
      let currentValue = this.creatorRooms.value;
      rooms.forEach(item => {
        currentValue.push(item)
      })
      this.creatorRooms.next(currentValue);
    } else {
      let currentValue = this.memberRooms.value;
      rooms.forEach(item => {
        currentValue.push(item)
      })
      this.memberRooms.next(currentValue);
    }
  }

  clearRooms() {
    this.creatorRooms.next([])
    this.memberRooms.next([])
  }
}
