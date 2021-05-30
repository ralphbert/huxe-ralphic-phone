import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LobbyRoutingModule} from './lobby-routing.module';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {UiModule} from '../ui/ui.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';

@NgModule({
  declarations: [
    LobbyComponent,
    UserProfileComponent
  ],
  imports: [
    LobbyRoutingModule,
    CommonModule,
    UiModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class LobbyModule { }
