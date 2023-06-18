import {AfterContentInit, Component, EventEmitter, Inject, Output} from '@angular/core';
import {SocketService} from "../../../../../service/user/socket.service";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoomDTO} from "../../../../../service/models/DTO/RoomDTO";
import {RoomService} from "../../../../../service/user/room.service";
import {Observable} from "rxjs";
import {UserService} from "../../../../../service/user/user.service";
import {ImageSnippet} from "../../../../../service/models/imageSnippet";
import {ImageService} from "../../../../../service/system/image.service";
import {bottom} from "@popperjs/core";
import {readBooleanType} from "@angular/compiler-cli/src/ngtsc/metadata/src/util";
import {SnackService} from "../../../../../service/snack.service";

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
    roomOptions: {
      createChatRoomCreate: true,
      roomImageKey: ""
    },
    isEvent: false,
    closingAt: 0,
    members: [],
    creators: [],
    geolocation: {
      coords: {
        location: {
          x: 0.0,
          y: 0.0
        }
      }
    }
  };

  roomImageSnippet: any;

  possibleMembers: any[] = [];

  currentUser: any;

  constructor(private socketService: SocketService,
              private roomService: RoomService,
              private userService: UserService,
              private imageService: ImageService,
              private snackService: SnackService,
              public dialogRef: MatDialogRef<RoomCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RoomData) {
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  saveRoom() {
    if (this.roomImageSnippet && this.roomImageSnippet.file) {
      this.imageService.uploadImage(this.roomImageSnippet.file).subscribe({
        next: value => {
          if (value) {
            this.room.roomOptions['roomImageKey'] = value.hash;
          }
        }, complete: () => {
          this.saveRoomData()
        }
      })
    } else {
      this.saveRoomData()
    }
  }

  saveRoomData() {
    this.roomService.saveRoom(this.room, this.data.edit).subscribe({
      next: (json) => {
        this.roomService.appendRoom(json, "CREATOR", this.data.edit);
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

  processFile(imageInput: any) {
    const file: File = imageInput[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.roomImageSnippet = new ImageSnippet(event.target.result, file);
    })
    reader.readAsDataURL(file);
  }

  mapToEdit(templateRoom) {
    console.log(';tetetetetr', templateRoom)
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
      geolocation: {
        coords: {
          location: {
            x: templateRoom.geolocation.coords.location.x,
            y: templateRoom.geolocation.coords.location.y
          }
        }
      }
    }
  }

  deleteRoom() {
    this.roomService.deleteRoomById(this.room.uuid).subscribe({
      next: (value: any) => {
      }, error: () => {
        this.snackService.roomDeleteError()
      }, complete: () => {
        this.snackService.roomDeleted();
        this.roomService.removeRoom(this.room.uuid)
      }
    })
    this.dialogRef.close();
  }
}
