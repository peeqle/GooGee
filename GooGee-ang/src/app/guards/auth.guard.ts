import {Injectable} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  canActivate(){
    if (this.authService.isUserAuthorized()) {
      console.log('CAN')
      return true;
    }
    console.log('CUNT')
    this.router.navigate(['login'])
    return false;
  }
}
