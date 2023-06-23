import { Component } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import { NotificationService } from './service/notification/notification.service';
import { animationFrameScheduler, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = false;

  constructor(
    notify: NotificationService,
  ) {
    const onLoading = (loading: boolean) => (this.loading = loading);

    notify.spinner.pipe(debounceTime(0, animationFrameScheduler)).subscribe(onLoading);
  }
}
