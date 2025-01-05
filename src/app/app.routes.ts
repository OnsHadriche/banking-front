import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientComponent } from './components/client/client.component';
import { FormCreateClientComponent } from './components/form-create-client/form-create-client.component';
import { FormEditClientComponent } from './components/form-edit-client/form-edit-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FomrEditAccountComponent } from './components/fomr-edit-account/fomr-edit-account.component';
import { FomrCreateAccountComponent } from './components/fomr-create-account/fomr-create-account.component';


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
    path: 'edit-client/:clientId',
    component: FormEditClientComponent,
    pathMatch: 'full',
  },
  {
    path: 'client-details/:clientId',
    component: ClientDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'account-banking',
    component: AccountComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit-account/:rib',
    component: FomrEditAccountComponent,
    pathMatch: 'full',
  },
  {
    path: 'create-account',
    component: FomrCreateAccountComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
