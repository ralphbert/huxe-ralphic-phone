import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameWrapperComponent} from './modules/core/components/game-wrapper/game-wrapper.component';
import {LeaveGameGuard} from './modules/core/guards/leave-game.guard';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
}, {
  path: ':gameId',
  component: GameWrapperComponent,
  canDeactivate: [LeaveGameGuard],
  children: [{
    path: 'lobby',
    loadChildren: () => import('./modules/lobby/lobby.module').then(m => m.LobbyModule)
  }, {
    path: 'game',
    loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule)
  }],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
