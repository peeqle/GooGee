import {AfterContentInit, Component, Inject, OnInit} from '@angular/core';
import {SocketService} from "../../../../../../service/user/socket.service";
import {RoomService} from "../../../../../../service/user/room.service";
import {UserService} from "../../../../../../service/user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomData} from "../../../room/room-create/room-create.component";
import {HolderService} from "../../../../service/holder.service";
import { ActivityTab } from 'src/app/service/models/ActivityTab.enum';

@Component({
  selector: 'app-friends-modal',
  templateUrl: './friends-modal.component.html',
  styleUrls: ['./friends-modal.component.css']
})
export class FriendsModalComponent implements OnInit, AfterContentInit {
  constructor(private socketService: SocketService,
              private roomService: RoomService,
              private userService: UserService,
              private tabService: HolderService,
              public dialogRef: MatDialogRef<FriendsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                userId: number
              }) {
  }

  friendsList: any;

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    this.userService.fetchUserFriends(this.data.userId).subscribe({
      next: (json) => {
        this.friendsList = json
      }
    })
  }

  goToChat(friend: any) {
    this.dialogRef.close()

    this.tabService.changeCurrentActiveTab(ActivityTab.CHAT)
    this.tabService.changeSelectedChatUser(friend);
  }
}
