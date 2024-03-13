import { Routes } from '@angular/router';

import { HomeComponent } from '@pages/home/home.component';
import { InventoriesComponent } from '@pages/inventories/inventories.component';
import { SettingsComponent } from '@pages/settings/settings.component';
import { SuppliersComponent } from '@pages/suppliers/suppliers.component';
import { LoginComponent } from '@pages/login/login.component';

import { AuthGuard } from '@guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inventories',
    component: InventoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suppliers',
    component: SuppliersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
