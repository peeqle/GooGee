import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from "./modules/styles-module/shared.module";
import {MaterialModule} from "./modules/material/material.module";
import {LoginComponent} from './components/login/login.component';
import {RouterModule} from "@angular/router";
import {ShellComponent} from './components/shell/shell.component';
import {NavigatorComponent} from './components/navigator/navigator.component';
import {MainFrameComponent} from './components/main-frame/main-frame.component';
import {MapsComponent} from './components/maps/maps.component';
import {ActivitySliderComponent} from './components/activity-slider/activity-slider.component';
import {ActivityTabComponent} from './components/activity-slider/activity-tab/activity-tab.component';
import {RoomComponent} from './components/activity-slider/panels/room/room/room.component';
import {ProfileComponent} from './components/activity-slider/panels/profile/profile/profile.component';
import {SettingsComponent} from './components/activity-slider/panels/settings/settings/settings.component';
import {ChatComponent} from "./components/activity-slider/panels/chat/chat/chat.component";
import {SearchComponent} from './components/activity-slider/panels/search/search.component';
import {PostsFrameComponent} from "./components/activity-slider/panels/profile/post/posts-frame/posts-frame.component";
import {
  PostsElementComponent
} from "./components/activity-slider/panels/profile/post/posts-element/posts-element.component";
import {RoomCreateComponent} from './components/activity-slider/panels/room/room-create/room-create.component';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from "@angular/material/dialog";
import {NgSelectModule} from "@ng-select/ng-select";
import {
  FriendsModalComponent
} from './components/activity-slider/panels/profile/profile/friends-modal/friends-modal.component';
import { ChatElementComponent } from './components/activity-slider/panels/chat/chat-element/chat-element.component';
import { ChatBoxComponent } from './components/activity-slider/panels/chat/chat-box/chat-box.component';

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
    SearchComponent,
    PostsFrameComponent,
    PostsElementComponent,
    RoomCreateComponent,
    FriendsModalComponent,
    ChatElementComponent,
    ChatBoxComponent
  ],
  imports: [
    NgbModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
