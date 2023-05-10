import {Component, HostListener} from '@angular/core';
import {CommonActivity} from "../../CommonActivity";
import {ModalService} from "../../../../../service/system/ui/modal.service";
import {RoomCreateComponent} from "../room-create/room-create.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent extends CommonActivity {

  name: string;

  animal: string;

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  constructor(private modalService: ModalService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<any>) {
    super();
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(RoomCreateComponent, {
      data: {},
    });



    this.dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
  triggerCreateRoomModal() {
    this.modalService.openTemplateModal(RoomCreateComponent)
  }
}
