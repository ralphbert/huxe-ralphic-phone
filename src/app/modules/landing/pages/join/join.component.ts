import {Component, OnInit} from '@angular/core';
import {JoinGame} from '../../../../store/game.actions';
import {Store} from '@ngxs/store';
import {switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  loading = false;
  error: Error;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
  }

  onJoin(gameId: string): void {
    this.loading = false;
    this.store.dispatch(new JoinGame(gameId))
      .pipe(
        switchMap(() => {
          return this.router.navigate(['/', gameId, 'lobby']);
        }),
      )
      .subscribe();
  }
}
