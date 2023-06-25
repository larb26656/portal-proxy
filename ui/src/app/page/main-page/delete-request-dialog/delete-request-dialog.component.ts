import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { MockApiService } from 'src/app/service/mock-api/mock-api.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { ErrorHandlerUtils } from 'src/app/utils/error-handler-utils';

@Component({
  selector: 'app-delete-request-dialog',
  templateUrl: './delete-request-dialog.component.html',
  styleUrls: ['./delete-request-dialog.component.scss']
})
export class DeleteRequestDialogComponent implements OnInit {

  constructor(
    public dialogRef: DialogRef<any>, 
    private readonly mockApiService: MockApiService,
    private readonly notificationService: NotificationService,
    @Inject(DIALOG_DATA) public data: any,
  ) { 
  }

  ngOnInit() {
  }

  delete(id: string) {
    this.notificationService.startSpinner();

    this.mockApiService.remove(id).pipe(
      finalize(() => this.notificationService.stopSpinner())
    )
    .subscribe({
      next: () => {
        this.notificationService.success('Deleted.');

        this.dialogRef.close(true);
      },
      error: (e) => {
        const msg = ErrorHandlerUtils.getMsg(e);

        this.notificationService.error(msg);
      }
    });
  }

  onDelete() {
    const id = this.data.id;

    if (id) {
      this.delete(id);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
