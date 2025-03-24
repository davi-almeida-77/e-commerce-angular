import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private snackBar: MatSnackBar ) { }

  showSuccess(message: string): void {
    this.snackBar.open(message, ' X ', {
      duration: 5000,
      panelClass: ['success-snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }

  showInfo(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: ['info-snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }

}
