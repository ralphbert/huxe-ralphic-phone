import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './pages/game/game.component';
import {GameRoutingModule} from './game-routing.module';

@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
  ]
})
export class GameModule { }
