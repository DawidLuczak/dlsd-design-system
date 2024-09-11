import { Route } from '@angular/router';
import { routes } from '../app.routes';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
  ...routes,
];
