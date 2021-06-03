import {Action, Select, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {EndGame, StartGame} from './game.actions';
import {GameState} from './game.state';
import {GameOperation, GameRoundState, Player} from '../modules/core/typings';

export interface InGameStateModel {
  roundState: GameRoundState;
  currentRound: number;
}

export function getDefaultState(): InGameStateModel {
  return {
    roundState: 'starting',
    currentRound: 1,
  };
}

@State<InGameStateModel>({
  name: 'inGameState',
  defaults: getDefaultState(),
})
@Injectable()
export class InGameState {
  constructor(private store: Store) {
  }

  @Selector([GameState.players])
  static totalRounds(state: InGameStateModel, players: Player[]): number {
    return players.length;
  }

  @Selector([GameState.players])
  static currentRound(state: InGameStateModel): number {
    return state.currentRound;
  }

  @Selector()
  static currentOperation(state: InGameStateModel): GameOperation {
    return state.currentRound % 2 === 0 ? 'drawing' : 'sentence';
  }

  @Selector()
  static roundState(state: InGameStateModel): GameRoundState {
    return state.roundState;
  }

  @Action(EndGame)
  endGame(context: StateContext<InGameStateModel>): void {
    context.setState(getDefaultState());
  }

  @Action(StartGame)
  startGame(context: StateContext<InGameStateModel>): void {
    context.setState(getDefaultState());
  }
}
