import {AfterContentInit, Component} from '@angular/core';
import {UserService} from "../../../../../service/user/user.service";
import {ActivityService} from "../../../service/activity.service";
import {HolderService} from "../../../service/holder.service";
import {CommonActivity} from "../../CommonActivity";
import {ActivityTab} from "../../../../../service/models/ActivityTab.enum";
import {PostService} from "../../../../../service/user/post.service";
import {PostDTO} from "../../../../../service/models/DTO/PostDTO";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends CommonActivity implements AfterContentInit {

  currentUser: any;

  content: any;

  constructor(private userService: UserService,
              private activityTabService: ActivityService,
              private tabHolder: HolderService,
              private postService: PostService) {
    super();
  }

  ngAfterContentInit(): void {
    let infoUser$: any;
    this.tabHolder.currentActiveTabIndex.subscribe({
      next: (value) => {
        if (value == ActivityTab.PROFILE) {
          infoUser$ = this.userService.fetchCurrentUserInfo().subscribe({
            next: (json) => {
              this.currentUser = json;
              console.log('jspn', json)
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

  savePost() {
    if (this.content) {
      let post: PostDTO = {
        content: this.content,
        createdAt: null,
        creatorUser: null,
        targetUser: null,
        parentPost: null
      }
      console.log('POST', post)
      this.postService.save(post).subscribe({
        next: (json) => {
          console.log('POST CAME JSON', json)
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
      images_file_types: 'jpg,svg,webp,gif',
      resize: false,
      height: 300,
      content_css: './profile.component.css'
    }
  }
}
