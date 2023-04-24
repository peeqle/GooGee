import {AfterContentInit, Component} from '@angular/core';
import {UserService} from "../../../../../service/user.service";
import {ActivityService} from "../../../service/activity.service";
import {HolderService} from "../../../service/holder.service";
import {CommonActivity} from "../../CommonActivity";
import {ActivityTab} from "../../../../../service/models/ActivityTab.enum";

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
              private tabHolder: HolderService) {
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

  getEditorConfig() {
    return {
      selector: 'textarea',
      images_upload_url: 'http://localhost:8080/api/v1/user/posts/post',
      automatic_uploads: true,
      images_dataimg_filter: function (img: any) {
        return !img.hasAttribute('internal-blob');  // blocks the upload of <img> elements with the attribute "internal-blob".
      },
      images_upload_handler: function (blobInfo: any, success: any, failure: any, progress: any) {
        let xhr: any, formData: any;

        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', 'postAcceptor.php');

        xhr.upload.onprogress = function (e: any) {
          progress(e.loaded / e.total * 100);
        };

        xhr.onload = function () {
          var json;

          if (xhr.status === 403) {
            failure('HTTP Error: ' + xhr.status, {remove: true});
            return;
          }

          if (xhr.status < 200 || xhr.status >= 300) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }

          json = JSON.parse(xhr.responseText);

          if (!json || typeof json.location != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }

          success(json.location);
        };

        xhr.onerror = function () {
          failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };

        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
      },
      block_unsupported_drop: true,
      plugins: 'image paste',
      images_file_types: 'jpg,svg,webp,gif',
      resize: false,
      height: 300,
      // menubar: false,
      value: "Hello World",
      content_css: 'profile.component.css'
    }
  }
}
