import {Component, HostListener, OnInit} from '@angular/core';
import {CommonActivity} from "../../CommonActivity";
import {ModalService} from "../../../../../service/system/ui/modal.service";
import {RoomCreateComponent} from "../room-create/room-create.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {RoomService} from "../../../../../service/user/room.service";
import {RoomComponent} from "../room/room.component";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent extends CommonActivity implements OnInit {

  @HostListener('window:keyup.esc') onKeyUp() {
    this.roomCreateRef.close();
  }

  asyncCreatorRooms: any;

  asyncMemberRooms: any;

  constructor(private modalService: ModalService,
              private roomCreateDialog: MatDialog,
              private roomCreateRef: MatDialogRef<any>,
              private roomScreenDialog: MatDialog,
              private roomScreenRef: MatDialogRef<any>,
              private roomService: RoomService) {
    super();
  }

  ngOnInit(): void {
    this.fetchUserRooms()
  }

  fetchUserRooms() {
    this.roomService.fetchRooms(0, 15).subscribe({
      next: (json: any) => {
        console.log('json', json)
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

  openRoomScreen(room, isCreator): void {
    this.roomScreenRef = this.roomScreenDialog.open(RoomComponent, {
      data: {
        edit: false,
        room: room,
        isCreator: isCreator
      },
      hasBackdrop: true,
      backdropClass: 'backdropBackground'
    });

    this.roomScreenRef.afterClosed().subscribe(result => {

    });
  }
}
