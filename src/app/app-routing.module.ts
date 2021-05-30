import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameWrapperComponent} from './modules/core/components/game-wrapper/game-wrapper.component';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
}, {
  path: ':gameId',
  component: GameWrapperComponent,
  children: [{
    path: 'lobby',
    loadChildren: () => import('./modules/lobby/lobby.module').then(m => m.LobbyModule)
  }],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
