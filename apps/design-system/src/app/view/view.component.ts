import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselContainerComponent } from './carousel-container/carousel-container.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { ToastsComponent } from './toasts/toasts.component';
import { TooltipsComponent } from './tooltips/tooltips.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DropdownsComponent,
    ToastsComponent,
    TooltipsComponent,
    CarouselContainerComponent,
  ],
})
export class ViewComponent {}
