import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {JoinGame} from '../../../../store/game.actions';
import {Store} from '@ngxs/store';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements OnInit {
  loading = false;
  error: Error;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        tap(() => {
          this.loading = true;
          this.error = null;
          this.changeDetectorRef.markForCheck();
        }),
        switchMap(params => {
          const gameId = params.get('gameId');
          return this.store.dispatch(new JoinGame(gameId)).pipe(
            switchMap(() => {
              return this.router.navigate(['/', gameId, 'lobby']);
            }),
            catchError(error => {
              this.error = error;
              return of(null);
            }),
          );
        }),
      )
      .subscribe(() => {
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      });
  }
}
