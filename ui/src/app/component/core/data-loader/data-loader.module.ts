import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FailDetailModule } from '../fail-detail/fail-detail.module';
import { DataLoaderComponent } from './data-loader.component';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  imports: [CommonModule, LoaderModule, FailDetailModule],
  declarations: [DataLoaderComponent],
  exports: [DataLoaderComponent],
})
export class DataLoaderModule {}
