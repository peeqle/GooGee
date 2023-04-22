import {AfterContentInit, AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {HolderService} from "../service/holder.service";
import {ActivityService} from "../service/activity.service";

@Component({
  selector: 'app-activity-tab',
  templateUrl: './activity-tab.component.html',
  styleUrls: ['./activity-tab.component.css']
})
export class ActivityTabComponent implements AfterContentInit {
  @Input("activityIndex")
  activityIndex: any;

  activity: any;

  active: boolean = false;

  @Output()
  tabClickEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor(private tabHolder: HolderService,private activityService: ActivityService) {

  }

  changeTab(event: Event) {
    this.active = !this.active;
    this.tabClickEventEmitter.emit(this.activity.id)
  }

  generateIdForActivityButton() {
    return `button-activity-${this.activity.id}`;
  }

  ngAfterContentInit(): void {
    this.activity = this.activityService.getActivityTabFullData(this.activityIndex)

    this.tabHolder.currentActiveTabIndex.subscribe({
      next: (value) => {
        this.active = this.activity.id == value
      }
    })
  }
}
