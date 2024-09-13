import { TemplateRef } from '@angular/core';

export interface CarouselContent<T> {
  templateRef: TemplateRef<unknown>;
  items: T[];
}
