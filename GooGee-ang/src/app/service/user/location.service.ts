import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {SnackService} from "../snack.service";
import {SettingsService} from "../system/settings.service";
import {HttpClient, HttpParams} from "@angular/common/http";
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
    }, 15000);
  }

  checkLocation(callback = () =>  {}) {
    let location = {};
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((sol) => {
        this.setUserLocation(sol);
        location = sol;
        callback()
      }, (err) => {
      })
    }
    return location;
  }

  fetchFriendsLocation() {
    return this.http.get(this.server.prepareServerLink(ServerLinks.FRIENDS_LOCATION_FETCH), {
      headers: this.server.generateRequiredHeaders()
    })
  }

  fetchRoomsLocation() {
    return this.http.get(this.server.prepareServerLink(ServerLinks.ROOMS_NEAR_LOCATION), {
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
