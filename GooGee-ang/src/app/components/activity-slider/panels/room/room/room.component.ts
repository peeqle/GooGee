import {AfterContentInit, Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomData} from "../room-create/room-create.component";
import {ImageService} from "../../../../../service/system/image.service";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../../../../service/user/user.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, AfterContentInit {
  roomImage: any = "";

  canJoin: boolean = false;

  constructor(public dialogRef: MatDialogRef<RoomComponent>,
              private imageService: ImageService,
              private userService: UserService,
              private sanitizer: DomSanitizer,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.getRoomImage();
  }

  getRoomImage() {
    let imageKey = this.data.room.roomOptions.roomImageKey;
    if (imageKey != null && imageKey !== "") {
      this.imageService.fetchImage(imageKey).subscribe({
        next: value => {
          let objectURL = URL.createObjectURL(value);
          this.roomImage = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
        }
      })
    }
  }

  getEditorConfig() {
    return {
      selector: 'textarea',
      images_upload_url: 'http://localhost:8080/api/v1/user/posts/post',
      automatic_uploads: true,
      block_unsupported_drop: true,
      plugins: 'image paste',
      toolbar: '',
      menubar: '',
      images_file_types: 'jpg,svg,webp,gif',
      resize: false,
      height: 140,
      content_css: './profile.component.css'
    }
  }
}
