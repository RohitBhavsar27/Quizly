import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageQuestionComponent } from './manage-question/manage-question.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ShowResultsComponent } from './show-results/show-results.component';
import { AuthGuard } from './auth.guard';
import { adminAuthGuard } from './admin-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'question',
        component: QuestionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'result',
        component: ResultComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'adminDashboard',
        component: AdminDashboardComponent,
        canActivate: [adminAuthGuard]
    },
    {
        path: 'manageQuestions',
        component: ManageQuestionComponent,
        // canActivate: [adminAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'adminLogin',
        component: AdminLoginComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'showResults',
        component: ShowResultsComponent,
        canActivate: [adminAuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: ''
    }, // Redirect unknown routes to login
];
