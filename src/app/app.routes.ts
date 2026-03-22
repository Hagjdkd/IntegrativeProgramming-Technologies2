import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login'; 

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  // Change '/dashboard' to '/login' below:
  { path: '', redirectTo: '/login', pathMatch: 'full' } 
];