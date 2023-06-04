import {Component, OnInit, Renderer2} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validator, Validators} from "@angular/forms";
import {AuthService} from "../../service/system/auth.service";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Octokit} from "octokit";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new UntypedFormGroup(
    {
      username: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required])
    }
  )

  registerForm = new UntypedFormGroup(
    {
      username: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.email, Validators.required]),
      password: new UntypedFormControl('', [Validators.required])
    }
  )
  registerSelected: boolean = false;

  constructor(private renderer: Renderer2,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events.subscribe({
      next: (value: any) => {
        if (value.routerEvent) {
          let route = value.routerEvent.urlAfterRedirects;
          const urlDelimiters = new RegExp(/[?//]/);
          let delimiterSet = route.split(urlDelimiters);
          if (delimiterSet.indexOf('github') != -1) {
            this.checkGitTokens();
          } else if (delimiterSet.indexOf('google') != -1) {
            this.checkGoogleTokens();
          }
        }
      }
    })
  }

  checkGitTokens() {
    let routeSnap: any = this.activatedRoute.snapshot;
    let code = routeSnap.queryParams.code;
    if (code) {
      this.authService.exchangeCode(code).subscribe({
        next: value => {
        }
      })
    }
  }

  checkGoogleTokens() {
    let routeSnap: any = this.activatedRoute.snapshot;
    let code = routeSnap.queryParams.code;
    if (code) {
      this.authService.exchangeCode(code).subscribe({
        next: value => {
        }
      })
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
    }
  }

  flipRegister() {
    this.registerSelected = !this.registerSelected;
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
    }
  }

  loginGit() {
    window.open("http://localhost:8080/oauth2/authorization/github", "_self");
  }

  loginGoogle() {
    window.open("http://localhost:8080/oauth2/authorization/google", "_self");
  }
}
