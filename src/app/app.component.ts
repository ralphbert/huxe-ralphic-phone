import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {EMPTY, Observable} from 'rxjs';
import {GameState} from './store/game.state';
import {switchMap} from 'rxjs/operators';
import {GameMode, GameStage} from './modules/core/typings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(GameState.mode) mode$: Observable<GameMode>;
  @Select(GameState.stage) stage$: Observable<GameStage>;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.mode$.pipe(
      switchMap(mode => {
        if (mode === 'client') {
          return this.stage$;
        }

        return EMPTY;
      })
    ).subscribe(stage => {
      console.log('navigateTo', stage);
    });
  }
}
