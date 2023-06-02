import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {SnackService} from "../snack.service";
import {SettingsService} from "../system/settings.service";
import {HttpClient} from "@angular/common/http";
import {ServerService} from "../system/server.service";
import {ServerLinks} from "../resource/ServerLinks.enum";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private userLocation: Subject<GeolocationPosition> = new Subject<GeolocationPosition>();

  private checkLoc: boolean = true;

  constructor(private snackService: SnackService,
              private settingsService: SettingsService,
              private server: ServerService,
              private http: HttpClient) {
  }

  runLocationChecker() {
    const intervalCheckLocation = setInterval(() => {
      this.checkLocation()
    }, 5000);
  }

  checkLocation() {
    const $this = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((sol) => {
        this.setUserLocation(sol);
      }, (err) => {
      })
    }
  }

  fetchFriendsLocation() {
    return this.http.get(this.server.prepareServerLink(ServerLinks.FRIENDS_LOCATION_FETCH), {
      headers: this.server.generateRequiredHeaders()
    })
  }

  setUserLocation(position: GeolocationPosition) {
    this.userLocation.next(position);
    return location;
  }

  locationCheckSubscribe() {
    this.settingsService.getConstantLocationCheckStateSubscription().subscribe(val => {
      this.checkLoc = val;
    })
  }

  getUserLocationSub(): Observable<GeolocationPosition> {
    return this.userLocation.asObservable();
  }
}
