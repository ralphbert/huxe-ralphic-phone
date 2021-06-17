import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './pages/landing/landing.component';
import {RouterModule} from '@angular/router';
import { JoinComponent } from './pages/join/join.component';
import {FormsModule} from '@angular/forms';
import { HostComponent } from './pages/host/host.component';
import {LandingRoutingModule} from './landing-routing.module';
import { JoinFormComponent } from './components/join-form/join-form.component';
import { UiModule } from '../ui/ui.module';


@NgModule({
  declarations: [
    LandingComponent,
    JoinComponent,
    HostComponent,
    JoinFormComponent
  ],
  exports: [
    LandingComponent,
  ],
  imports: [
    LandingRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    UiModule,
  ]
})
export class LandingModule {
}
