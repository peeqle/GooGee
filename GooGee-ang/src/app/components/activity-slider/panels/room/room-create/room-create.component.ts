import {Component, Inject} from '@angular/core';
import {SocketService} from "../../../../../service/user/socket.service";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface RoomData {

}
@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent {
  constructor(private socketService: SocketService,
              public dialogRef: MatDialogRef<RoomCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RoomData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  createChat() {
    this.socketService.createChat()
  }
}
