import {Component, OnInit, Renderer2} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validator, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

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

  constructor(private renderer: Renderer2, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
    }
  }

  flipRegister() {
    this.registerSelected = !this.registerSelected;
  }

  register() {
    if(this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
    }
  }
}
