import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomData} from "../room-create/room-create.component";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  constructor(public dialogRef: MatDialogRef<RoomComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
