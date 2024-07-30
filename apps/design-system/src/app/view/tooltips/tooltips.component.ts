import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TooltipDirective } from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-tooltips',
  standalone: true,
  imports: [TooltipDirective],
  templateUrl: './tooltips.component.html',
  styleUrl: './tooltips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipsComponent {}
