import { NotificationService } from './service/notification/notification.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClientModule
} from '@angular/common/http';
import { NavigationModule } from './component/core/navigation/navigation.module';
import { CodeEditorModule } from '@ngstack/code-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from './component/core/loader/loader.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavigationModule,
    CodeEditorModule.forRoot(),
    ReactiveFormsModule,
    LoaderModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
        NotificationService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
