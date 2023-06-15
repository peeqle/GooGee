import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private matSnack: MatSnackBar) {}

  geoPositionAccessDeniedShow() {
    this.matSnack.open("Access to geo position error", '', {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "bottom"
    })
  }

  roomDeleted() {
    this.matSnack.open("Room successfully deleted!", 'Ok', {
      duration: 2500,
      horizontalPosition: "start",
      verticalPosition: "bottom"
    })
  }

  roomDeleteError() {
    this.matSnack.open("Error while deleting room", 'Ok', {
      duration: 2500,
      horizontalPosition: "start",
      verticalPosition: "bottom"
    })
  }

  registerRequestError() {
    this.matSnack.open("Error occurred while registering! Try again.", ':(', {
      duration: 5000,
      horizontalPosition: "start",
      verticalPosition: "bottom"
    })
  }

  loginRequestError() {
    this.matSnack.open("Cannot login", ':(', {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "bottom"
    })
  }
}
