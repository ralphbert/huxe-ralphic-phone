import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameWrapperComponent} from './components/game-wrapper/game-wrapper.component';
import {RouterModule} from '@angular/router';
import {IfHostDirective} from './directives/if-host.directive';
import {IfClientDirective} from './directives/if-client.directive';

@NgModule({
  declarations: [
    GameWrapperComponent,
    IfHostDirective,
    IfClientDirective,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    IfHostDirective,
    IfClientDirective,
  ]
})
export class CoreModule {
}
