import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';


import { AppRoutingModule } from './app-routing/app-routing.module';

import { HighlightDirective } from './directives/highlight.directive';
import { WinterComponent } from './winter/winter.component';
import { SummerComponent } from './summer/summer.component';
import { AddSummerComponent } from './add-summer/add-summer.component';
import { AddWinterComponent } from './add-winter/add-winter.component';
import { EditSummerComponent } from './edit-summer/edit-summer.component';
import { EditWinterComponent } from './edit-winter/edit-winter.component';

import { AddUserComponent } from './add-user/add-user.component';
import { ModelComponent } from './model/model.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AngularFileUploaderModule } from "angular-file-uploader";

import { FileInputAccessorModule } from "file-input-accessor";
import { FeedbackComponent } from './feedback/feedback.component';

import { SummerResolver } from './resolver/summer.resolver';
import { WinterResolver } from './resolver/winter.resolver';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorage } from '@angular/fire/storage';
import { FileSizePipe } from './pipes/file-size.pipe';
import { AddImageSummerComponent } from './add-image-summer/add-image-summer.component';
import { AddImageWinterComponent } from './add-image-winter/add-image-winter.component';
import { ColorPickerModule } from 'ngx-color-picker';


const config = {
  apiKey: "AIzaSyAhOfUVG0SNEq0fghsVQEDSevzDvYQAnDE",
  authDomain: "xb-four.firebaseapp.com",
  databaseURL: "https://xb-four.firebaseio.com",
  projectId: "xb-four",
  storageBucket: "xb-four.appspot.com",
  messagingSenderId: "532753022090",
  appId: "1:532753022090:web:712137f990d9e301730173"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HighlightDirective,
    WinterComponent,
    SummerComponent,
    AddSummerComponent,
    AddWinterComponent,
    EditSummerComponent,
    EditWinterComponent,
    AddUserComponent,
    ModelComponent,
    DashboardComponent,
    PageNotFoundComponent,
    FeedbackComponent,
    FileSizePipe,
    AddImageSummerComponent,
    AddImageWinterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSnackBarModule,
    HttpClientModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    AngularFileUploaderModule,
    FileInputAccessorModule,
    ColorPickerModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    AngularFireStorage,
    SummerResolver,
    WinterResolver
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
