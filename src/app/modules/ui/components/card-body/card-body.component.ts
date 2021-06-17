import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardBodyComponent {
  @HostBinding('class')
  classes = 'p-4 block';
}
