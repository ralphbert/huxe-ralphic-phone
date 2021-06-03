import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import {
  CustomizePlayer,
  EndGame,
  HostGame,
  JoinGame,
  LeaveGame,
  SetGameData,
  SetGameId,
  SetPlayersData,
  SetUser,
  StartGame
} from './game.actions';
import {combineLatest, Observable, of} from 'rxjs';
import {GameService} from '../services/game.service';
import {distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {GameData, GameExistence, GameId, GameMode, GameStage, Player, PlayerId} from '../modules/core/typings';
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

  playerData: Player[];
  playerDataLoading: boolean;
}

function getDefaultState(): GameStateModel {
  return {
    user: null,
    gameId: null,
    gameData: null,
    gameDataLoading: false,
    playerData: null,
    playerDataLoading: false,
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

  @Selector()
  static players(state: GameStateModel): Player[] {
    return state.playerData || [];
  }

  @Selector([GameState.players, GameState.playerId])
  static player(state: GameStateModel, players: Player[], playerId: PlayerId): Player | null {
    return players.find(p => p.id === playerId) || null;
  }

  @Selector([GameState.players])
  static allReady(state: GameStateModel, players: Player[]): boolean {
    return players.every(p => (p.name != null) && (p.avatar != null));
  }

  ngxsOnInit(context: StateContext<GameStateModel>): any {
    const gameIdChange$ = this.store.select(GameState.gameId).pipe(
      distinctUntilChanged(),
    );

    gameIdChange$.pipe(
      switchMap(gameId => {
        context.patchState({
          gameDataLoading: true,
        });

        console.log('%cGame id changed', 'color: purple; font-weight: bold;', gameId);
        if (gameId) {
          return this.gameService.getGameDoc(gameId).pipe(
            switchMap(doc => {
              const gameDataObservable$ = doc.valueChanges().pipe(
                map(data => data || null),
                switchMap((gameData) => {
                  console.log('%cgameData', 'color: red; font-weight: bold;', gameData);
                  return context.dispatch(new SetGameData(gameData));
                }),
              );

              const playersObservable$ = doc.collection<Player>('players').valueChanges({idField: 'id'}).pipe(
                map(data => data || null),
                switchMap((playerData) => {
                  console.log('%cplayerData', 'color: orange; font-weight: bold;', playerData);
                  return context.dispatch(new SetPlayersData(playerData));
                }),
              );

              return combineLatest([playersObservable$, gameDataObservable$]);
            }),
          );
        } else {
          return of(null);
        }
      }),
    ).subscribe(() => {
      console.log('setting new gameData');
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

  @Action(JoinGame)
  joinGame(context: StateContext<GameStateModel>, action: JoinGame): Observable<void> {
    const playerId = this.store.selectSnapshot(GameState.playerId);
    return this.gameService.joinGame(action.gameId, playerId);
  }

  @Action(CustomizePlayer, {cancelUncompleted: true})
  setPlayerName(context: StateContext<GameStateModel>, action: CustomizePlayer): Observable<any> {
    const state = context.getState();
    const playerId = this.store.selectSnapshot(GameState.playerId);

    if (state.gameId != null && playerId != null) {
      return this.gameService.customizePlayer(state.gameId, playerId, {
        ...(this.store.selectSnapshot(GameState.player) || {}),
        ...action.playerSettings,
      });
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
      gameData: action.gameData as GameData,
    });
  }

  @Action(SetPlayersData)
  setPlayersData(context: StateContext<GameStateModel>, action: SetPlayersData): void {
    context.patchState({
      playerDataLoading: false,
      playerData: action.player,
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

  @Action(StartGame)
  startGame(context: StateContext<GameStateModel>): Observable<any> {
    return this.gameService.startGame(context.getState().gameId);
  }

  @Action(LeaveGame)
  leaveGame(context: StateContext<GameStateModel>): Observable<any> {
    const state = context.getState();
    const mode = this.store.selectSnapshot(GameState.mode);

    if (mode === 'host') {
      return context.dispatch(new EndGame());
    } else {
      return this.gameService.leaveGame(state.gameId, this.store.selectSnapshot(GameState.playerId));
    }
  }
}
