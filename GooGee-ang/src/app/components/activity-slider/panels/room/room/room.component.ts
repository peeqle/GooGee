import {Component, HostListener, OnInit} from '@angular/core';
import {CommonActivity} from "../../CommonActivity";
import {ModalService} from "../../../../../service/system/ui/modal.service";
import {RoomCreateComponent} from "../room-create/room-create.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {RoomService} from "../../../../../service/user/room.service";
import {FriendsModalComponent} from "../../profile/profile/friends-modal/friends-modal.component";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent extends CommonActivity implements OnInit {

  name: string;

  animal: string;

  @HostListener('window:keyup.esc') onKeyUp() {
    this.roomCreateRef.close();
  }

  constructor(private modalService: ModalService,
              private roomCreateDialog: MatDialog,
              private roomCreateRef: MatDialogRef<any>,
              private roomService: RoomService) {
    super();
  }

  ngOnInit(): void {
    this.fetchUserRooms()
  }

  fetchUserRooms() {
    this.roomService.fetchRooms(0, 15).subscribe({
      next: (json) => {
        console.log('josn', json)
      }
    })
  }

  openCreateRoomDialog(): void {
    this.roomCreateRef = this.roomCreateDialog.open(RoomCreateComponent, {
      data: {},
      hasBackdrop: true,
      backdropClass: 'backdropBackground'
    });

    this.roomCreateRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
}
