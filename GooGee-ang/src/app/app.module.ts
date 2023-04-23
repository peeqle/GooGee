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
import { ActivitySliderComponent } from './components/activity-slider/activity-slider.component';
import { ActivityTabComponent } from './components/activity-slider/activity-tab/activity-tab.component';
import { RoomComponent } from './components/activity-slider/panels/room/room/room.component';
import { ProfileComponent } from './components/activity-slider/panels/profile/profile/profile.component';
import { SettingsComponent } from './components/activity-slider/panels/settings/settings/settings.component';
import {ChatComponent} from "./components/activity-slider/panels/chat/chat/chat.component";
import { SearchComponent } from './components/activity-slider/panels/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShellComponent,
    NavigatorComponent,
    MainFrameComponent,
    MapsComponent,
    ChatComponent,
    ActivitySliderComponent,
    ActivityTabComponent,
    RoomComponent,
    ProfileComponent,
    SettingsComponent,
    SearchComponent
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
