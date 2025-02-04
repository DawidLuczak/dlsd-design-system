import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  DLSDActiveRoutesTree,
  DLSDComponentsContainerComponent,
  DLSDNavItemComponent,
  DLSDSwitchComponent,
} from '@dlsd/angular-ui';
import { TranslateModule } from '@ngx-translate/core';
import { routes } from './app.routes';
import { I18N_NAMESPACE } from './core/constants/app-constants';

enum View {
  ROUTER_OUTLET,
  COMPONENT_OUTLETS,
}

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    DLSDSwitchComponent,
    DLSDNavItemComponent,
    DLSDComponentsContainerComponent,
    NgClass,
    NgStyle,
    RouterOutlet,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly View = View;
  protected readonly I18N = `${I18N_NAMESPACE}.view`;

  protected routes = signal(routes);
  protected activeRouteTree = signal<DLSDActiveRoutesTree>({
    route: this.routes()[0],
  });
  protected view = signal(View.COMPONENT_OUTLETS);

  private componentsContainerRef =
    viewChild.required<DLSDComponentsContainerComponent>(
      DLSDComponentsContainerComponent
    );
  private mainContainerRef =
    viewChild.required<ElementRef<HTMLElement>>('mainContainerRef');

  constructor(private router: Router) {}

  protected changeView(flag: boolean): void {
    this.view.set(flag ? View.ROUTER_OUTLET : View.COMPONENT_OUTLETS);
    if (this.view() !== View.ROUTER_OUTLET) return;

    this.navigateRouter(this.activeRouteTree());
  }

  protected navigateTo(activeRoute: DLSDActiveRoutesTree): void {
    this.activeRouteTree.set(activeRoute);
    this.view()
      ? this.componentsContainerRef().changeSection(
          activeRoute,
          this.mainContainerRef().nativeElement
        )
      : this.navigateRouter(activeRoute);
  }

  private navigateRouter(activeRoute: DLSDActiveRoutesTree): void {
    const path = this.combineRoutePath(activeRoute);
    this.router.navigate(path);
  }

  private combineRoutePath(activeRoute: DLSDActiveRoutesTree): string[] {
    let routeTree = activeRoute.routesTree;
    const path = [`${routeTree?.route.path ?? activeRoute.route.path}`];
    while (routeTree?.routesTree?.route.path) {
      path.push(routeTree.routesTree.route.path);
      routeTree = routeTree.routesTree;
    }

    return path;
  }
}
