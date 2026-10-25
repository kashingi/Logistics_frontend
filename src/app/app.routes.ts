import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'features/auth/signup', component: Signup },
    { path: 'auth/forgot-password', component: ForgotPassword },
];
