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
        let route = value.routerEvent.urlAfterRedirects;
        const urlDelimitators = new RegExp(/[?//]/);
        let delimiterSet = route.split(urlDelimitators);
        if (delimiterSet.indexOf('github') != -1) {
          this.checkGitTokens();
        } else if (delimiterSet.indexOf('google') != -1) {
          this.checkGoogleTokens();
        }
      }
    })
  }

  checkGitTokens() {
    console.log('this.active toir', this.activatedRoute.snapshot)
    let routeSnap: any = this.activatedRoute.snapshot;
    let code = routeSnap.queryParams.code;
    if (code) {
      this.authService.exchangeCode(code).subscribe({
        next: value => {
          console.log('VALUEEEEE', value)
        }
      })
    }
  }

  checkGoogleTokens() {

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
