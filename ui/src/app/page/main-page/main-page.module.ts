import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageRoutes } from './main-page.routing';
import { RequestCardModule } from 'src/app/component/common/request-card/request-card.module';
import { CodeEditorModule } from '@ngstack/code-editor';
import { DataLoaderModule } from 'src/app/component/core/data-loader/data-loader.module';
import { MockApiEditorComponent } from './mock-api-editor/mock-api-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page.component';
import { CodeInputModule } from 'src/app/component/core/input/code-input/code-input.module';
import { ImportMockApiDialogComponent } from './import-mock-api-dialog/import-mock-api-dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { DeleteRequestDialogComponent } from './delete-request-dialog/delete-request-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MainPageRoutes,
    RequestCardModule,
    CodeEditorModule,
    DataLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    CodeInputModule,
    DialogModule,
    CdkMenu, 
    CdkMenuItem,
    CdkMenuTrigger
  ],
  declarations: [MainPageComponent, MockApiEditorComponent, ImportMockApiDialogComponent, DeleteRequestDialogComponent]
})
export class MainPageModule { }
