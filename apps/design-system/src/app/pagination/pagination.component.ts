import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DLSDPaginationComponent } from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [DLSDPaginationComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {}
