import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {HostGame} from '../../../../store/game.actions';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {GameState} from '../../../../store/game.state';
import {GameService} from '../../../../services/game.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  loading = false;
  error: Error = null;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.host();
  }

  host(): void {
    this.loading = true;
    this.error = null;

    this.store.dispatch(new HostGame())
      .pipe(
        switchMap(() => {
          const gameId = this.store.selectSnapshot(GameState.gameId);
          console.log('gameId', gameId);
          return this.router.navigate(['/', gameId, 'lobby']);
        }),
        catchError(error => {
          this.error = error;
          return of(null);
        }),
      )
      .subscribe(() => {
        this.loading = false;
      });
  }
}
