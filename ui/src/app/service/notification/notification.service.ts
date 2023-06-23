import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  spinner = new EventEmitter<boolean>();

  constructor() {}

//   error(message: string = 'บันทึกไม่สำเร็จ', action?: string) {
//     return this.snackbar.open(message, action, SNACK_BAR_CONFIG.error);
//   }

//   info(message: string = '', action?: string) {
//     return this.snackbar.open(message, action, SNACK_BAR_CONFIG.info);
//   }

//   success(message: string = 'บันทึกสำเร็จ', action?: string) {
//     return this.snackbar.open(message, action, SNACK_BAR_CONFIG.success);
//   }

//   warn(message: string = '', action?: string) {
//     return this.snackbar.open(message, action, SNACK_BAR_CONFIG.warn);
//   }

  startSpinner() {
    this.spinner.emit(true);
  }

  stopSpinner() {
    this.spinner.emit(false);
  }

}

// const SNACK_BAR_CONFIG: Record<string, MatSnackBarConfig> = {
//   error: {
//     duration: 2500,
//     panelClass: 'notify-error',
//     horizontalPosition: 'center',
//   },
//   info: {
//     duration: 1500,
//     horizontalPosition: 'center',
//     panelClass: 'notify-info',
//   },
//   success: {
//     duration: 1500,
//     horizontalPosition: 'center',
//     panelClass: 'notify-success',
//   },
//   warn: {
//     duration: 2000,
//     horizontalPosition: 'center',
//     panelClass: 'notify-warn',
//   },
// };
