import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {HolderService} from "./service/holder.service";
import {ActivityTab} from "../../service/models/ActivityTab.enum";
import {ActivityService} from "./service/activity.service";

@Component({
  selector: 'app-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.css']
})
export class ActivitySliderComponent implements OnInit, AfterContentInit {
  @Input("userActivities")
  userActivities: any[] = [ActivityTab.CHAT, ActivityTab.ROOMS, ActivityTab.PROFILE, ActivityTab.SEARCH, ActivityTab.SETTINGS];

  currentSelectedTab: any;

  constructor(private tabHolder: HolderService,
              private activityService: ActivityService) {
  }

  ngOnInit(): void {
  }

  changeActiveTab(val: any) {
    this.tabHolder.changeCurrentActiveTab(val);
  }

  ngAfterContentInit(): void {
    this.tabHolder.currentActiveTabIndex.subscribe({
      next: (value) => {
        this.currentSelectedTab = value;
      }
    })
  }

  protected readonly ActivityTab = ActivityTab;
}
