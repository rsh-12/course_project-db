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
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatBadgeModule} from "@angular/material/badge";
import {DataListComponent} from './components/data-list/data-list.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {DialogDataComponent} from './components/dialog-data/dialog-data.component';
import {MatCardModule} from "@angular/material/card";
import {CompanyDetailsComponent} from './components/companies/company-details/company-details.component';
import {StudentDetailsComponent} from './components/students/student-details/student-details.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { StudentsCoursesComponent } from './components/students/students-courses/students-courses.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        ProfileComponent,
        CourseDetailsComponent,
        CoursesListComponent,
        CompaniesListComponent,
        StudentsListComponent,
        ContractsListComponent,
        CertificatesListComponent,
        InstructorsListComponent,
        NavbarComponent,
        ConfirmDialogComponent,
        DataListComponent,
        DialogDataComponent,
        CompanyDetailsComponent,
        StudentDetailsComponent,
        StudentsCoursesComponent
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
        MatBadgeModule,
        MatTabsModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatCardModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
