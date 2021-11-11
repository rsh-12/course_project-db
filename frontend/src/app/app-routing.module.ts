import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {CoursesListComponent} from "./components/courses/courses-list/courses-list.component";
import {CourseDetailsComponent} from "./components/courses/course-details/course-details.component";
import {AddCourseComponent} from "./components/courses/add-course/add-course.component";
import {CompaniesListComponent} from "./components/companies/companies-list/companies-list.component";

const routes: Routes = [
    {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
    {path: 'courses', component: CoursesListComponent, canActivate: [AuthGuardService]},
    {path: 'courses/:id', component: CourseDetailsComponent, canActivate: [AuthGuardService]},
    {path: 'courses/add', component: AddCourseComponent, canActivate: [AuthGuardService]},
    {path: 'companies', component: CompaniesListComponent, canActivate: [AuthGuardService]},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
