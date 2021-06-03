import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  styleUrls: ['./join-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinFormComponent {
  constructor(private router: Router) {
  }

  onJoin(gameId: string): void {
    if (gameId) {
      this.router.navigate(['/join', gameId]);
    }
  }
}
