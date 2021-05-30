import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomizePlayer} from '../../../../store/game.actions';
import {Observable} from 'rxjs';
import {Player, PlayerId} from '../../../core/typings';
import {GameState} from '../../../../store/game.state';
import {filter, take} from 'rxjs/operators';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent implements OnInit {
  @Select(GameState.players) players$: Observable<Player[]>;
  @Select(GameState.player) player$: Observable<Player>;
  @Select(GameState.allReady) allReady$: Observable<boolean>;
  formGroup: FormGroup;

  constructor(private store: Store, private router: Router, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.player$.pipe(
      filter(p => p != null),
      take(1)
    ).subscribe(player => {
      this.formGroup.patchValue({
        name: player.name,
        image: player.avatar,
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const { name, image } = this.formGroup.value;
      this.store.dispatch(new CustomizePlayer({
        avatar: image,
        name,
        ready: true,
      }));
    }
  }

  trackById(_: number, player: Player): PlayerId {
    return player.id;
  }
}
