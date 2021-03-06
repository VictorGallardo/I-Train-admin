import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent } from './items/items.component';
import { ListsComponent } from './lists/lists.component';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from '../guards/login.guard';
import { EventsComponent } from './events/events.component';
import { InfoComponent } from './info/info.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children:
      [
        {
          path: 'dashboard',
          component: DashboardComponent,
        },
        {
          path: 'users',
          component: UsersComponent
        },
        {
          path: 'lists',
          component: ListsComponent
        },
        {
          path: 'items',
          component: ItemsComponent
        },
        {
          path: 'events',
          component: EventsComponent
        },
        {
          path: 'info',
          component: InfoComponent
        },

        {
          path: '',
          redirectTo: '/info',
          pathMatch: 'full'
        }
      ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);


