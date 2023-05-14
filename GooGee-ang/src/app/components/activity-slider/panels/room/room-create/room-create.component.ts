import {AfterContentInit, Component, Inject} from '@angular/core';
import {SocketService} from "../../../../../service/user/socket.service";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoomDTO} from "../../../../../service/models/DTO/RoomDTO";
import {RoomService} from "../../../../../service/user/room.service";
import {Observable} from "rxjs";
import {UserService} from "../../../../../service/user/user.service";

export interface RoomData {

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
    creators: []
  };

  possibleMembers: any[] = [];

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

      }, error: (err) => {

      }, complete: () => {
        this.dialogRef.close();
      }
    })
  }

  ngAfterContentInit(): void {
    this.userService.fetchUserFriends().subscribe({
      next: (json:[]) => {
        if(json) {
          this.possibleMembers = json
        }
      }
    })
  }
}
