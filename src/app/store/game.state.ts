import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import {EndGame, HostGame, SetGameData, SetGameId, SetPlayerName, SetUser} from './game.actions';
import {Observable, of} from 'rxjs';
import {GameService} from '../services/game.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {GameData, GameExistence, GameId, GameMode, GameStage, PlayerId} from '../modules/core/typings';
import firebase from 'firebase';

export interface GameStateModel {
  /**
   * The anonymous user session
   */
  user: firebase.User | null;

  /**
   * the Id of the current game session
   */
  gameId: string;

  /**
   * The game data from the fire store
   */
  gameData: GameData;
  gameDataLoading: boolean;
}

function getDefaultState(): GameStateModel {
  return {
    user: null,
    gameId: null,
    gameData: null,
    gameDataLoading: false,
  };
}

@State<GameStateModel>({
  name: 'gameState',
  defaults: getDefaultState(),
})
@Injectable()
export class GameState implements NgxsOnInit {

  constructor(
    private gameService: GameService,
    private store: Store,
  ) {
  }

  @Selector()
  static stage(state: GameStateModel): GameStage {
    return state.gameData?.stage || null;
  }

  @Selector([GameState.playerId, GameState.hostPlayerId])
  static mode(state: GameStateModel, playerId: PlayerId, hostPlayerId: PlayerId): GameMode {
    if (playerId == null || hostPlayerId == null) {
      // player not set or no game started. So no game mode set yet.
      return null;
    }

    return playerId === hostPlayerId ? 'host' : 'client';
  }

  @Selector()
  static gameId(state: GameStateModel): GameId {
    return state.gameId || null;
  }

  @Selector()
  static gameExistence(state: GameStateModel): GameExistence {
    if (state.gameDataLoading) {
      return 'loading';
    }

    if (state.gameId && state.gameData != null) {
      return 'existing';
    }

    return 'not-existing';
  }

  @Selector()
  static playerId(state: GameStateModel): PlayerId {
    return state.user?.uid || null;
  }

  @Selector()
  static hostPlayerId(state: GameStateModel): PlayerId {
    return state.gameData?.hostPlayerId || null;
  }

  ngxsOnInit(context: StateContext<GameStateModel>): any {
    this.store.select(GameState.gameId).pipe(
      switchMap(gameId => {
        context.patchState({
          gameDataLoading: true,
        });

        console.log('Game id changed', gameId);
        if (gameId) {
          return this.gameService.getGameDoc(gameId).pipe(
            switchMap(doc => {
              return doc.valueChanges().pipe(
                map(data => data || null),
                tap(() => {
                }),
              );
            }),
          );
        } else {
          return of(null);
        }
      }),
    ).subscribe((gameData) => {
      console.log('setting new gameData', gameData);
      context.dispatch(new SetGameData(gameData));
    });
  }

  @Action(HostGame)
  hostGame(context: StateContext<GameStateModel>): Observable<any> {
    const playerId = this.store.selectSnapshot(GameState.playerId);

    if (!playerId) {
      throw new Error('No player Id set!');
    }

    return this.gameService.hostGame(playerId)
      .pipe(
        map(gameId => {
          context.patchState({
            gameId,
          });

          return gameId;
        }),
      );
  }

  @Action(SetPlayerName, {cancelUncompleted: true})
  setPlayerName(context: StateContext<GameStateModel>, action: SetPlayerName): Observable<any> {
    const state = context.getState();
    const playerId = this.store.selectSnapshot(GameState.playerId);

    if (state.gameId != null && playerId != null) {
      return this.gameService.setUsername(state.gameId, playerId, action.name);
    }

    return of(null);
  }

  @Action(SetUser, {cancelUncompleted: true})
  setUser(context: StateContext<GameStateModel>, action: SetUser): void {
    context.patchState({
      user: action.user,
    });
  }

  @Action(EndGame)
  endGame(context: StateContext<GameStateModel>): Observable<void> {
    const gameId = context.getState().gameId;
    return this.gameService.endGame(gameId);
  }

  @Action(SetGameData)
  setGameData(context: StateContext<GameStateModel>, action: SetGameData): void {
    context.patchState({
      gameDataLoading: false,
      gameData: action.gameData,
    });
  }

  @Action(SetGameId)
  setGameId(context: StateContext<GameStateModel>, action: SetGameId): void {
    if (context.getState().gameId !== action.gameId) {
      context.patchState({
        gameId: action.gameId,
        gameData: null,
      });
    }
  }
}
