import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GameState} from '../../../../store/game.state';
import {GameService} from '../../../../services/game.service';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {EndGame, LeaveGame, SetGameId} from '../../../../store/game.actions';
import {GameExistence, GameId, GameMode, PlayerId} from '../../typings';
import {CanDeactivateResponder, TypeOrObservable} from '../../../../lib/can-deactivate.interface';
import {ConfirmDialogData} from '../../../dialogs/components/confirm/confirm.component';

@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameWrapperComponent implements OnInit, OnDestroy, CanDeactivateResponder {
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
    this.store.dispatch(new LeaveGame());
  }

  endGame(): void {
    this.store.dispatch(new EndGame());
  }

  canDeactivate(): TypeOrObservable<boolean> {
    return false;
  }

  canDeactivateContent(): TypeOrObservable<ConfirmDialogData> {
    let message: string;

    if (this.store.selectSnapshot(GameState.mode) === 'host') {
      message = 'You are the host of this game. If you leave the game will be closed. Do you want to leave and close the game?';
    } else {
      message = 'You are a client of this game. You can re-join while the game has not yet started. Do you really want to leave?';
    }

    return {
      message,
      acceptButton: 'Leave',
      declineButton: 'Stay',
    };
  }
}
