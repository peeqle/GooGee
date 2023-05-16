import {AfterContentInit, Component, Inject, OnInit} from '@angular/core';
import {SocketService} from "../../../../../../service/user/socket.service";
import {RoomService} from "../../../../../../service/user/room.service";
import {UserService} from "../../../../../../service/user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomData} from "../../../room/room-create/room-create.component";

@Component({
  selector: 'app-friends-modal',
  templateUrl: './friends-modal.component.html',
  styleUrls: ['./friends-modal.component.css']
})
export class FriendsModalComponent implements OnInit, AfterContentInit{
  constructor(private socketService: SocketService,
              private roomService: RoomService,
              private userService: UserService,
              public dialogRef: MatDialogRef<FriendsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                userId: number
              }) {
  }

  friendsList: any;
  friendsLists: any = [
    {
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },
    {
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },
    {
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },
    {
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },
    {
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },
    {
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },
    {
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    },{
      "success": false,
      "transactionTime": 0,
      "id": 2,
      "imageKey": null,
      "username": "second",
      "status": null,
      "lastActive": null,
      "roles": [
        "USER"
      ],
      "friendsCount": 1,
      "eventsVisited": 0
    }
  ];

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    this.userService.fetchUserFriends(this.data.userId).subscribe({
      next: (json) => {
        this.friendsList = json
      }
    })
  }
}
