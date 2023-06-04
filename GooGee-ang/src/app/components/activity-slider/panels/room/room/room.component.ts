import {Component, HostListener, OnInit} from '@angular/core';
import {CommonActivity} from "../../CommonActivity";
import {ModalService} from "../../../../../service/system/ui/modal.service";
import {RoomCreateComponent} from "../room-create/room-create.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {RoomService} from "../../../../../service/user/room.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent extends CommonActivity implements OnInit {

  @HostListener('window:keyup.esc') onKeyUp() {
    this.roomCreateRef.close();
  }

  asyncCreatorRooms: any;

  asyncMemberRooms: any;

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
      next: (json: any) => {
        this.roomService.appendRooms(json.createdRooms, "CREATOR")
        this.roomService.appendRooms(json.memberRooms, "MEMBER")

        this.roomService.creatorRooms.subscribe({
          next: value => {
            this.asyncCreatorRooms = value
          }
        })

        this.roomService.memberRooms.subscribe({
          next: value => {
            this.asyncMemberRooms = value
          }
        })
      }
    })
  }

  openCreateRoomDialog(): void {
    this.roomCreateRef = this.roomCreateDialog.open(RoomCreateComponent, {
      data: {
        edit: false
      },
      hasBackdrop: true,
      backdropClass: 'backdropBackground'
    });

    this.roomCreateRef.afterClosed().subscribe(result => {

    });
  }

  openEditRoomDialog(room): void {
    this.roomCreateRef = this.roomCreateDialog.open(RoomCreateComponent, {
      data: {
        edit: true,
        room: room
      },
      hasBackdrop: true,
      backdropClass: 'backdropBackground'
    });
  }
}
