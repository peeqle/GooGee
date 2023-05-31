import {inject, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../components/login/login.component";
import {MainFrameComponent} from "../../components/main-frame/main-frame.component";
import {AuthGuard} from "../../guards/auth.guard";

const paths: Routes = [
  {
    path: 'login', component: LoginComponent, children: [
      {
        path: 'oauth2', children: [
          {
            path: 'code', children: [
              {path: 'github', component: LoginComponent},
              {path: 'google', component: LoginComponent}
            ]
          }
        ]
      }
    ], pathMatch: "prefix"
  }, {
    path: '', component: MainFrameComponent, canActivate: [() => {
      inject(AuthGuard).canActivate()
    }]
  },

  {path: '**', redirectTo: ''}
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
