import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { MockApiService } from 'src/app/service/mock-api/mock-api.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { ErrorHandlerUtils } from 'src/app/utils/error-handler-utils';

@Component({
  selector: 'app-import-mock-api-dialog',
  templateUrl: './import-mock-api-dialog.component.html',
  styleUrls: ['./import-mock-api-dialog.component.scss']
})
export class ImportMockApiDialogComponent implements OnInit {

  readonly importForm: FormGroup<ImportFormModel>

  constructor(
    public dialogRef: DialogRef<any>, 
    @Inject(DIALOG_DATA) public data: any,
    private readonly mockApiService: MockApiService,
    private readonly notificationService: NotificationService,
    private readonly fb: FormBuilder, 
    ) {
      this.importForm = fb.group<ImportFormModel>({
        curl: fb.control('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      })
    }

  ngOnInit() {
  }

  importByCurl() {
    this.notificationService.startSpinner();

    const curl = this.importForm.controls.curl.value;

    this.mockApiService
    .createDraftByCurl(curl)
    .pipe(
      finalize(() => this.notificationService.stopSpinner())
    )
    .subscribe(
      {
        next: res => {
          this.notificationService.success('Created.');
          const data = res.data;

          console.log(data);

          this.dialogRef.close(data);
        },
        error: (e) => {
          const msg = ErrorHandlerUtils.getMsg(e);
  
          this.notificationService.error(msg);
        }
      }
    );
  }

  onImport() {
    if (this.importForm.invalid) {
      this.importForm.markAllAsTouched();
      return;
    }

    this.importByCurl();
  }

  onCancel() {
    this.dialogRef.close();
  }

}


interface ImportFormModel {
  curl: FormControl<string>;
}