import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LobbyRoutingModule} from './lobby-routing.module';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    LobbyComponent,
    UserProfileComponent
  ],
  imports: [
    LobbyRoutingModule,
    CommonModule
  ]
})
export class LobbyModule { }
