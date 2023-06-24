import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeInputComponent } from './code-input.component';
import { CodeEditorModule } from '@ngstack/code-editor';

@NgModule({
  imports: [
    CommonModule,
    CodeEditorModule
  ],
  declarations: [CodeInputComponent],
  exports: [CodeInputComponent]
})
export class CodeInputModule { }
