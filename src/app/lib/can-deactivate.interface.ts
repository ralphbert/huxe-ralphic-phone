import {Observable, of} from 'rxjs';
import {ConfirmDialogData} from '../modules/dialogs/components/confirm/confirm.component';

export type TypeOrObservable<T> = T | Observable<T>;

export interface CanDeactivateResponder {
  canDeactivate(): TypeOrObservable<boolean>;
  canDeactivateContent?(): TypeOrObservable<ConfirmDialogData>;
}

export function toObservable<T>(input: TypeOrObservable<T>): Observable<T> {
  if (input instanceof Observable) {
    return input;
  }

  return of(input);
}
