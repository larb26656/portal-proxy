import { EventEmitter, Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  spinner = new EventEmitter<boolean>();

  constructor(private readonly snackbar: MatSnackBar) {}

  error(message: string = '', action?: string) {
    return this.snackbar.open(message, action, SNACK_BAR_CONFIG['error']);
  }

  info(message: string = '', action?: string) {
    return this.snackbar.open(message, action, SNACK_BAR_CONFIG['info']);
  }

  success(message: string = '', action?: string) {
    return this.snackbar.open(message, action, SNACK_BAR_CONFIG['success']);
  }

  warn(message: string = '', action?: string) {
    return this.snackbar.open(message, action, SNACK_BAR_CONFIG['warn']);
  }

  startSpinner() {
    this.spinner.emit(true);
  }

  stopSpinner() {
    this.spinner.emit(false);
  }

}

const SNACK_BAR_CONFIG: Record<string, MatSnackBarConfig> = {
  error: {
    duration: 2500,
    panelClass: 'notify-error',
    horizontalPosition: 'right',
  },
  info: {
    duration: 1500,
    panelClass: 'notify-info',
    horizontalPosition: 'right',
  },
  success: {
    duration: 1500,
    panelClass: 'notify-success',
    horizontalPosition: 'right',
  },
  warn: {
    duration: 2000,
    panelClass: 'notify-warn',
    horizontalPosition: 'right',
  },
};
