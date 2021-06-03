import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-clipboard-wrapper',
  templateUrl: './clipboard-wrapper.component.html',
  styleUrls: ['./clipboard-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipboardWrapperComponent {
  @Input() content: string;

  constructor(private notificationService: NotificationService) {
  }

  onCopy(): void {
    if (this.content) {
      this.notificationService.notify('Copied!', 1000);
    }
  }
}
