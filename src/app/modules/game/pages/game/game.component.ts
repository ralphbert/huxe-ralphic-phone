import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Select} from '@ngxs/store';
import {InGameState} from '../../../../store/in-game.state';
import {Observable} from 'rxjs';
import {GameOperation, GameRoundState} from '../../../core/typings';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  @Select(InGameState.currentOperation) operation$: Observable<GameOperation>;
  @Select(InGameState.totalRounds) totalRounds$: Observable<number>;
  @Select(InGameState.currentRound) currentRound$: Observable<number>;
  @Select(InGameState.roundState) roundState$: Observable<GameRoundState>;

  constructor() { }

  ngOnInit(): void {
  }

}
