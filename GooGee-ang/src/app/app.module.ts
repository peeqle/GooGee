import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from "./modules/styles-module/shared.module";
import {MaterialModule} from "./modules/material/material.module";
import { LoginComponent } from './components/login/login.component';
import {RouterModule} from "@angular/router";
import { ShellComponent } from './components/shell/shell.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { MapsComponent } from './components/maps/maps.component';
import { ChatFrameComponent } from './components/chat-frame/chat-frame.component';
import {MatCardModule} from "@angular/material/card";
import { ChatComponent } from './components/chat-frame/chat/chat.component';
import { ChatElementComponent } from './components/chat-frame/chat-element/chat-element.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShellComponent,
    NavigatorComponent,
    MainFrameComponent,
    MapsComponent,
    ChatFrameComponent,
    ChatComponent,
    ChatElementComponent
  ],
  imports: [
    NgbModule,
    SharedModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
