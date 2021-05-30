import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {GameState} from './store/game.state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';

@NgModule({
  imports: [
    NgxsModule.forRoot([GameState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  exports: [
    NgxsModule,
  ],
})
export class AppStoreModule {}
