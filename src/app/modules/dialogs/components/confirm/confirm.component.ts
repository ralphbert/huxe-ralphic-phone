import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ConfirmDialogData {
  message: string;
  acceptButton?: string;
  declineButton?: string;
}

export const defaultConfirmDialogData: ConfirmDialogData = {
  declineButton: 'Cancel',
  acceptButton: 'OK',
  message: null,
};

@Component({
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent {
  data: ConfirmDialogData;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: ConfirmDialogData, private dialogRef: MatDialogRef<ConfirmComponent>) {
    this.data = {
      ...defaultConfirmDialogData,
      ...dialogData,
    };
  }

  accept(): void {
    this.dialogRef.close(true);
  }

  decline(): void {
    this.dialogRef.close(false);
  }
}
