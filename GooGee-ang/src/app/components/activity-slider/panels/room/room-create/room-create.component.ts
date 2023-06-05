import {AfterContentInit, Component, EventEmitter, Inject, Output} from '@angular/core';
import {SocketService} from "../../../../../service/user/socket.service";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoomDTO} from "../../../../../service/models/DTO/RoomDTO";
import {RoomService} from "../../../../../service/user/room.service";
import {Observable} from "rxjs";
import {UserService} from "../../../../../service/user/user.service";

export interface RoomData {
  edit: boolean,
  room: any
}

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements AfterContentInit {

  room: RoomDTO = {
    uuid: "",
    roomName: "",
    roomDescription: "",
    maxMembers: 1,
    roomOptions: {},
    isEvent: false,
    closingAt: 0,
    members: [],
    creators: [],
    location: {
      latitude: 0,
      longitude: 0
    }
  };

  possibleMembers: any[] = [];

  currentUser: any;

  constructor(private socketService: SocketService,
              private roomService: RoomService,
              private userService: UserService,
              public dialogRef: MatDialogRef<RoomCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RoomData) {
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  createRoom() {
    this.roomService.saveRoom(this.room).subscribe({
      next: (json) => {
        this.roomService.appendRoom(json, "CREATOR");
      }, error: (err) => {

      }, complete: () => {
        this.dialogRef.close();
      }
    })
  }

  ngAfterContentInit(): void {
    this.userService.fetchCurrentUserInfo().subscribe({
      next: (user) => {
        this.currentUser = user;

        this.userService.fetchUserFriends(user.id).subscribe({
          next: (json: []) => {
            if (json) {
              let index = 0;
              this.possibleMembers = json.map(user => {
                // @ts-ignore
                return {id: user.id, name: user.username}
              })
            }
          },
          complete: () => {
            if (this.data.edit) {
              this.mapToEdit(this.data.room)
            }
          }
        })
      }
    })
  }

  mapToEdit(templateRoom) {
    this.room = {
      uuid: templateRoom.uuid,
      roomName: templateRoom.roomName,
      roomDescription: templateRoom.roomDescription,
      maxMembers: templateRoom.maxMembers,
      roomOptions: templateRoom.roomOptions,
      isEvent: templateRoom.isEvent,
      closingAt: templateRoom.closingAt,
      members: templateRoom.members,
      creators: templateRoom.creators,
      location: {
        latitude: templateRoom.location.latitude,
        longitude: templateRoom.location.longitude,
      }
    }
  }

  deleteRoom() {

  }
}
