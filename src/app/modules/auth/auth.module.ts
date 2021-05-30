import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {Store} from '@ngxs/store';
import {SetUser} from '../../store/game.actions';

export function initAuthState(angularFireAuth: AngularFireAuth, store: Store): () => Promise<any> {
  return () => angularFireAuth.signInAnonymously().then(signInData => {
    console.log('signInData', signInData);
    return store.dispatch(new SetUser(signInData.user)).toPromise();
  });
}

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
  ],
  declarations: [],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initAuthState,
    deps: [AngularFireAuth, Store],
    multi: true,
  }],
  exports: [AngularFireAuthModule],
})
export class AuthModule {
}
