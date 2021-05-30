import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GameState} from '../../../../store/game.state';
import {GameService} from '../../../../services/game.service';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {EndGame, SetGameId} from '../../../../store/game.actions';
import {GameExistence, GameId, GameMode, PlayerId} from '../../typings';

@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameWrapperComponent implements OnInit, OnDestroy {
  @Select(GameState.playerId) playerId$: Observable<PlayerId>;
  @Select(GameState.gameId) gameId$: Observable<GameId>;
  @Select(GameState.gameExistence) gameExistence$: Observable<GameExistence>;
  @Select(GameState.mode) mode$: Observable<GameMode>;

  constructor(private store: Store, private gameService: GameService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map(params => params.get('gameId')),
        switchMap(id => {
          return this.store.dispatch(new SetGameId(id));
        }),
      )
      .subscribe(() => {

      });
  }

  ngOnDestroy(): void {

  }

  endGame(): void {
    this.store.dispatch(new EndGame());
  }
}
