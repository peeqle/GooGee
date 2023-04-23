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
}
