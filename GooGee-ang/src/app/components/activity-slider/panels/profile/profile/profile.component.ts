import {AfterContentInit, Component} from '@angular/core';
import {UserService} from "../../../../../service/user/user.service";
import {ActivityService} from "../../../service/activity.service";
import {HolderService} from "../../../service/holder.service";
import {CommonActivity} from "../../CommonActivity";
import {ActivityTab} from "../../../../../service/models/ActivityTab.enum";
import {PostService} from "../../../../../service/user/post.service";
import {PostDTO} from "../../../../../service/models/DTO/PostDTO";
import {environment} from "../../../../../../environments/environment.prod";
import {FriendsModalComponent} from "./friends-modal/friends-modal.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../../../../service/system/local-storage.service";
import {ProfileEditComponent} from "../profile-edit/profile-edit.component";
import {ImageService} from "../../../../../service/system/image.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends CommonActivity implements AfterContentInit {

  currentUser: any;

  content: any;

  profileImage: any;

  constructor(private userService: UserService,
              private activityTabService: ActivityService,
              private tabHolder: HolderService,
              private postService: PostService,
              private lsService: LocalStorageService,
              private imageService: ImageService,
              private friendsDialog: MatDialog,
              private friendsRef: MatDialogRef<any>,
              private editionDialog: MatDialog,
              private editionRef: MatDialogRef<any>) {
    super();
  }

  ngAfterContentInit(): void {
    let infoUser$: any;
    this.tabHolder.currentActiveTabObs.subscribe({
      next: (value) => {
        if (value == ActivityTab.PROFILE) {
          infoUser$ = this.userService.fetchCurrentUserInfo().subscribe({
            next: (json) => {
              this.currentUser = json;
              this.lsService.save("user", json)
              this.fetchUserImage();
            }, error: err => {

            }, complete: () => {

            }
          })
        } else {
          if (infoUser$ != null) {
            infoUser$.unsubscribe()
          }
        }
      }
    })
  }

  fetchUserImage() {
    this.imageService.fetchImage(this.currentUser.imageKey).subscribe({
      next: value => {
        console.log('iamge service value', value)
      }
    })
  }

  savePost() {
    if (this.content) {
      let post: PostDTO = {
        content: this.content,
        createdAt: null,
        creatorUser: null,
        targetUser: null,
        parentPost: null
      }

      this.postService.save(post).subscribe({
        next: (json) => {
        }
      })
    }
  }

  openFriendsDialog(): void {
    this.friendsRef = this.friendsDialog.open(FriendsModalComponent, {
      data: {
        userId: this.currentUser.id
      },
      hasBackdrop: true,
      backdropClass: 'backdropBackground'
    });

    this.friendsRef.afterClosed().subscribe(result => {

    });
  }

  openProfileEditionDialog() {
    this.editionRef = this.editionDialog.open(ProfileEditComponent, {
      data: {
        userId: this.currentUser.id
      },
      hasBackdrop: true,
      backdropClass: 'backdropBackground'
    });

    this.editionRef.afterClosed().subscribe(result => {

    });
  }

  getEditorConfig() {
    return {
      selector: 'textarea',
      images_upload_url: 'http://localhost:8080/api/v1/user/posts/post',
      automatic_uploads: true,
      block_unsupported_drop: true,
      plugins: 'image paste',
      images_file_types: 'jpg,svg,webp,gif',
      resize: false,
      height: 300,
      content_css: './profile.component.css'
    }
  }

  getEditorKey() {
    return environment.editorKey;
  }
}
