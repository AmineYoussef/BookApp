import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { EmailLoginComponent } from './user/email-login/email-login.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { A11yModule } from '@angular/cdk/a11y';
import { BookComponent } from './book/book.component';

import { SnackService } from './services/snack.service';
import { BookDialogComponent } from './dialogs/book-dialog/book-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    EmailLoginComponent,
    BookComponent,
    BookDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    FlexLayoutModule,
    FormsModule,
    A11yModule
  ],
  providers: [SnackService],
  bootstrap: [AppComponent],
  entryComponents: [BookDialogComponent]
})
export class AppModule { }
