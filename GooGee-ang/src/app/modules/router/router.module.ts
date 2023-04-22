import {inject, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../components/login/login.component";
import {MainFrameComponent} from "../../components/main-frame/main-frame.component";
import {AuthGuard} from "../../guards/auth.guard";

const paths: Routes = [
  {
    path: '', component: MainFrameComponent, canActivate: [() => {
      inject(AuthGuard).canActivate()
    }]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', component: MainFrameComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(paths)
  ],
  exports: [
    RouterModule
  ]
})
export class Router {
}
