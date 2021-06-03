import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private matSnackBar: MatSnackBar) {
  }

  notify(message: string, duration: number = 2000): MatSnackBarRef<TextOnlySnackBar> {
    return this.matSnackBar.open(message, '', {duration});
  }
}
