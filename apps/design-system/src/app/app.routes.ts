import { Routes } from '@angular/router';
import { formsRoutes } from './forms/forms.routes';
import { iconsRoutes } from './icons/icons.routes';
import { paginationRoutes } from './pagination/pagination.routes';
import { tabsRoutes } from './tabs/tabs.routes';
import { viewRoutes } from './view/view.routes';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
];

export const routes: Routes = [
  ...formsRoutes,
  ...iconsRoutes,
  ...paginationRoutes,
  ...tabsRoutes,
  ...viewRoutes,
];
