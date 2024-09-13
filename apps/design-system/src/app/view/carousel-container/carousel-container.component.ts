import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DLSDCarouselContainerComponent } from '@dlsd/angular-ui';

@Component({
  selector: 'app-carousel-container',
  templateUrl: './carousel-container.component.html',
  styleUrls: ['./carousel-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DLSDCarouselContainerComponent],
})
export class CarouselContainerComponent {}
