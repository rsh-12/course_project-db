import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';

import {authInterceptorProviders} from './helpers/auth.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatLineModule, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {AddCourseComponent} from './components/courses/add-course/add-course.component';
import {CourseDetailsComponent} from './components/courses/course-details/course-details.component';
import {CoursesListComponent} from './components/courses/courses-list/courses-list.component';
import {MatSelectModule} from "@angular/material/select";
import {CompaniesListComponent} from './components/companies/companies-list/companies-list.component';
import {StudentsListComponent} from './components/students/students-list/students-list.component';
import {ContractsListComponent} from './components/contracts/contracts-list/contracts-list.component';
import {CertificatesListComponent} from './components/certificates/certificates-list/certificates-list.component';
import {InstructorsListComponent} from './components/instructors/instructors-list/instructors-list.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        ProfileComponent,
        AddCourseComponent,
        CourseDetailsComponent,
        CoursesListComponent,
        CompaniesListComponent,
        StudentsListComponent,
        ContractsListComponent,
        CertificatesListComponent,
        InstructorsListComponent,
        NavbarComponent,
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatListModule,
        MatLineModule,
        MatSelectModule,
        MatOptionModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
