import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {CoursesListComponent} from "./components/courses/courses-list/courses-list.component";
import {CourseDetailsComponent} from "./components/courses/course-details/course-details.component";
import {CompaniesListComponent} from "./components/companies/companies-list/companies-list.component";
import {StudentsListComponent} from "./components/students/students-list/students-list.component";
import {ContractsListComponent} from "./components/contracts/contracts-list/contracts-list.component";
import {CertificatesListComponent} from "./components/certificates/certificates-list/certificates-list.component";
import {InstructorsListComponent} from "./components/instructors/instructors-list/instructors-list.component";

const routes: Routes = [
    {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
    {path: 'courses', component: CoursesListComponent, canActivate: [AuthGuardService]},
    {path: 'courses/:id', component: CourseDetailsComponent, canActivate: [AuthGuardService]},
    {path: 'courses/add', component: CourseDetailsComponent, canActivate: [AuthGuardService]},
    {path: 'companies', component: CompaniesListComponent, canActivate: [AuthGuardService]},
    // {path: 'companies/:id', component: , canActivate: [AuthGuardService]},
    // {path: 'companies/add', component: , canActivate: [AuthGuardService]},
    {path: 'students', component: StudentsListComponent, canActivate: [AuthGuardService]},
    // {path: 'students/:id', component: , canActivate: [AuthGuardService]},
    // {path: 'students/add', component: , canActivate: [AuthGuardService]},
    {path: 'contracts', component: ContractsListComponent, canActivate: [AuthGuardService]},
    // {path: 'contracts/:id', component: , canActivate: [AuthGuardService]},
    // {path: 'contracts/add', component: , canActivate: [AuthGuardService]},
    {path: 'certificates', component: CertificatesListComponent, canActivate: [AuthGuardService]},
    // {path: 'certificates/:id', component: , canActivate: [AuthGuardService]},
    // {path: 'certificates/add', component: , canActivate: [AuthGuardService]},
    {path: 'instructors', component: InstructorsListComponent, canActivate: [AuthGuardService]},
    // {path: 'instructors/:id', component: , canActivate: [AuthGuardService]},
    // {path: 'instructors/add', component: , canActivate: [AuthGuardService]},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '404', redirectTo: 'home'},
    {path: '**', redirectTo: 'home'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
