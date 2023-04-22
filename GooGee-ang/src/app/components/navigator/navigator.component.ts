import {Component, OnInit} from '@angular/core';
import {SnackService} from "../../service/snack.service";
import {LocationService} from "../../service/location.service";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  constructor(private snackService: SnackService, private locationService: LocationService) {
  }

  ngOnInit(): void {
  }

  askNavigationPermission() {
    const $this = this;
    navigator.permissions.query({name: 'geolocation'}).then(function (result) {
      if (result.state == 'granted') {
        $this.report(result.state);
      } else if (result.state == 'prompt') {
        $this.report(result.state);
        // navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
      } else if (result.state == 'denied') {
        $this.report(result.state);
      }
      result.onchange = function () {
        $this.report(result.state);
      }
    });
  }

  private report(state: string) {
    console.log("PERMISSION STATE: ", state)
  }
}
