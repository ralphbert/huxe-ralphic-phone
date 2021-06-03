import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {CanDeactivateResponder, toObservable} from '../../../lib/can-deactivate.interface';
import {switchMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmComponent, ConfirmDialogData, defaultConfirmDialogData} from '../../dialogs/components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveGameGuard implements CanDeactivate<CanDeactivateResponder> {
  constructor(private matDialog: MatDialog) {
  }

  canDeactivate(
    component: CanDeactivateResponder,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component && component.canDeactivate) {
      const operation$: Observable<boolean> = toObservable(component.canDeactivate());
      const content$ = toObservable(component.canDeactivateContent && component.canDeactivateContent() || defaultConfirmDialogData);

      return forkJoin([operation$, content$]).pipe(
        switchMap(([canLeave, confirmData]) => {
          if (canLeave) {
            return of(true);
          } else {
            return this.matDialog.open<ConfirmComponent, ConfirmDialogData, boolean>(ConfirmComponent, {
              data: {
                ...confirmData,
              }
            }).afterClosed();
          }
        }),
      );
    }

    return true;
  }

}
