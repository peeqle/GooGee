import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private constantLocationCheckEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  public getConstantLocationCheckState(): boolean {
    return this.constantLocationCheckEnabled.getValue();
  }

  public getConstantLocationCheckStateSubscription(): Observable<boolean> {
    return this.constantLocationCheckEnabled.asObservable();
  }
}
