import {AfterContentInit, Component, Inject, OnInit} from '@angular/core';
import {SocketService} from "../../../../../service/user/socket.service";
import {RoomService} from "../../../../../service/user/room.service";
import {UserService} from "../../../../../service/user/user.service";
import {HolderService} from "../../../service/holder.service";
import {ChatService} from "../../../../../service/user/chat.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ImageService} from "../../../../../service/system/image.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, AfterContentInit {

  userData: {
    username: '',
    email: '',
    status: '',
    imageKey: ''
  }

  selectedFile: any;
  private currentUser: any;

  constructor(private socketService: SocketService,
              private roomService: RoomService,
              private userService: UserService,
              private tabService: HolderService,
              private chatService: ChatService,
              private imageService: ImageService,
              public dialogRef: MatDialogRef<ProfileEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                userId: number
              }) {
  }

  ngAfterContentInit(): void {
    this.currentUser = this.userService.getCurrentUserInfo();
    if (this.currentUser) {
      this.userData = {
        username: this.currentUser.username,
        email: this.currentUser.email,
        status: this.currentUser.status,
        imageKey: this.currentUser.imageKey
      }
    }
  }

  ngOnInit(): void {
  }

  processFile(imageInput: any) {
    const file: File = imageInput[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    })
    reader.readAsDataURL(file);
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.imageService.uploadImage(this.selectedFile.file).subscribe({
      next: (value: any) => {
        if (value) {
          this.userData.imageKey = value.hash;
          if (!this.userData.email) {
            this.userData.email = this.currentUser.email;
          }


          this.userService.updateUserInfo(this.userData).subscribe({
            next: value1 => {
            },
            complete: () => {
              this.dialogRef.close();
              this.imageService.fetchUserImage();
            }
          })
        }
      }
    });
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}
