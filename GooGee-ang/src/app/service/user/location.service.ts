import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Location} from "../models/Location";
import {SnackService} from "../snack.service";
import {SettingsService} from "../system/settings.service";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private userLocation: Subject<GeolocationPosition> = new Subject<GeolocationPosition>();

  private checkLoc: boolean = true;

  constructor(private snackService: SnackService, private settingsService: SettingsService) {
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
