import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './pages/landing/landing.component';
import {RouterModule} from '@angular/router';
import { JoinComponent } from './pages/join/join.component';
import {FormsModule} from '@angular/forms';
import { HostComponent } from './pages/host/host.component';
import {LandingRoutingModule} from './landing-routing.module';


@NgModule({
  declarations: [
    LandingComponent,
    JoinComponent,
    HostComponent
  ],
  exports: [
    LandingComponent,
  ],
  imports: [
    LandingRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
  ]
})
export class LandingModule {
}
