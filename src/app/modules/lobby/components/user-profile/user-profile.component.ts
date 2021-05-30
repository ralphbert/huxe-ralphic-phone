import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Player, PlayerId} from '../../../core/typings';
import {Select} from '@ngxs/store';
import {GameState} from '../../../../store/game.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  @Select(GameState.playerId) playerId$: Observable<PlayerId>;
  @Input() player: Player;
}
