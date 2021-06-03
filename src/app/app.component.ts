import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {combineLatest, EMPTY, Observable} from 'rxjs';
import {GameState} from './store/game.state';
import {filter, switchMap} from 'rxjs/operators';
import {GameMode, GameStage} from './modules/core/typings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(GameState.mode) mode$: Observable<GameMode>;
  @Select(GameState.stage) stage$: Observable<GameStage>;
  @Select(GameState.gameId) gameId$: Observable<GameStage>;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    combineLatest([
      this.mode$.pipe(filter(x => !!x)),
      this.stage$.pipe(filter(x => !!x)),
      this.gameId$.pipe(filter(x => !!x))
    ]).subscribe(([mode, stage, gameId]) => {
      console.log(mode, stage);
      return this.router.navigate(['/', gameId, stage]);
    });
  }
}
