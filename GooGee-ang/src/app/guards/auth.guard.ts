import {Injectable} from '@angular/core';
import {AuthService} from "../service/system/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  canActivate(){
    if (this.authService.isUserAuthorized()) {
      return true;
    }
    this.router.navigate(['login'])
    return false;
  }
}
