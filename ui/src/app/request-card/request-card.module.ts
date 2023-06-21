import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCardComponent } from './request-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RequestCardComponent],
  exports: [RequestCardComponent]
})
export class RequestCardModule { }
