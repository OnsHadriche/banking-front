import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { FormCreateClientComponent } from './form-create-client/form-create-client.component';
import { FormEditClientComponent } from './form-edit-client/form-edit-client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';

import { AccountComponent } from './account/account.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', // Fixed: removed trailing space
    component: HomeComponent,
    title: 'Home page',
    pathMatch: 'full',
  },
  {
    path: 'clients',
    component: ClientComponent,
    pathMatch: 'full',
  },
  {
    path: 'new-client',
    component: FormCreateClientComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit-client/:id',
    component: FormEditClientComponent,
    pathMatch: 'full',
  },
  {
    path: 'client-details/:id',
    component: ClientDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'account-banking',
    component: AccountComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
