import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {Router} from "../router/router.module";
import {GoogleMapsModule} from "@angular/google-maps";
import {EditorModule} from "@tinymce/tinymce-angular";
import {MatDialogModule} from "@angular/material/dialog";
import {NgSelectModule} from "@ng-select/ng-select";

const modules = [
  CommonModule,
  BrowserAnimationsModule,
  BrowserModule,
  FormsModule,
  HttpClientModule,
  MatNativeDateModule,
  ReactiveFormsModule,
  Router,
  GoogleMapsModule,
  EditorModule,
  MatDialogModule,
  NgSelectModule
]

@NgModule({
  declarations: [],
  exports: [
    ...modules,
  ],
  imports: [
    ...modules
  ]
})
export class SharedModule {
}
