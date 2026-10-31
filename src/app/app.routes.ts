import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { VerifyEmail } from './features/auth/verify-email/verify-email';
import { ResetPassword } from './features/auth/reset-password/reset-password';
import { MainLayout } from './layout/main-layout/main-layout';
import { Categories } from './features/catalog/categories/categories';
import { authGuard } from './core/guards/auth-guard';
import { Products } from './features/catalog/products/products';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'features/auth/signup', component: Signup },
    { path: 'auth/forgot-password', component: ForgotPassword },
    { path: 'auth/verify-email', component: VerifyEmail },
    { path: 'auth/reset-password', component: ResetPassword },
    { path: 'main-layout', component: MainLayout,
        children: [
            { path: 'categories', component: Categories, canActivate: [authGuard],},
            { path: 'products', component: Products, canActivate: [authGuard],}
        ]
     },
    { path: '**', redirectTo: '' },
];
