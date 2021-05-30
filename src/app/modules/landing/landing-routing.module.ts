import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {HostComponent} from './pages/host/host.component';
import {JoinComponent} from './pages/join/join.component';

const routes: Routes = [{
  path: '',
  component: LandingComponent,
}, {
  path: 'host',
  component: HostComponent,
}, {
  path: 'join/:gameId',
  component: JoinComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
