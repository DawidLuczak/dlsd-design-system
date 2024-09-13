import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  input,
  OnInit,
  Signal,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  delay,
  iif,
  interval,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { DLSDButtonComponent } from '../../../buttons';
import { CarouselContent } from '../carousel-container';

@Component({
  selector: 'dlsd-carousel-container',
  templateUrl: './carousel-container.component.html',
  styleUrls: ['./carousel-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DLSDButtonComponent, NgTemplateOutlet, NgStyle],
})
export class DLSDCarouselContainerComponent<T>
  implements AfterViewInit, OnInit
{
  public content = input.required<CarouselContent<T>>();
  public numberOfItemsToDisplay = input<number>(1);
  public width = input<string>();
  public height = input<string>();
  public gap = input<number>(0);
  public intervalMs = input<number>();
  public showButtons = input<boolean>(true);
  public showIndicator = input<boolean>(true);

  protected widthStyle: Signal<string> = signal('100%');
  protected items = signal<T[]>([]);
  protected scrollLeft = computed(() => {
    const index = this._currentItemIndex();
    if (!this.carouselContentContainerRef().nativeElement.children[index])
      return 0;
    return this.getChildElement(index).offsetLeft;
  });

  private _currentItemIndex = signal(0);

  private _next$ = new Subject();
  protected get next$() {
    return this._next$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.addNextItemCopy())
      )
      .pipe(
        delay(100),
        tap(() => this.scrollToNextItem(1))
      )
      .pipe(
        switchMap(() =>
          this.refreshLoop$(
            this._currentItemIndex() >= this.content().items.length,
            0,
            300
          )
        )
      );
  }

  private _previous$ = new Subject();
  protected get previous$() {
    return this._previous$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.addNextItemsCopies())
      )
      .pipe(
        switchMap(() =>
          this.refreshLoop$(
            this._currentItemIndex() == 0,
            this.content().items.length,
            100
          )
        )
      )
      .pipe(
        delay(100),
        tap(() => this.scrollToNextItem(-1))
      );
  }

  private interval?: Subscription;

  private carouselContentContainerRef = viewChild.required<
    ElementRef<HTMLElement>
  >('carouselContentContainerRef');

  constructor(
    private destroyRef: DestroyRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    effect(() => {
      const intervalMs = this.intervalMs();

      if (this.interval) {
        this.interval.unsubscribe();
        this.interval = undefined;
      }

      if (intervalMs) {
        this.interval = interval(intervalMs)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.next();
          });

        this.changeDetectorRef.markForCheck();
      }
    });
  }

  public ngOnInit(): void {
    // this.items.set(this.content()?.items ?? []);
    this.next$.subscribe();
    this.previous$.subscribe();
  }

  public ngAfterViewInit(): void {
    this.widthStyle = computed(() => {
      const element = this.carouselContentContainerRef().nativeElement
        .children[0] as HTMLElement;
      const elementWidth = element?.clientWidth ?? 0;
      const numberOfItemsToDisplay = this.numberOfItemsToDisplay();
      const gap = this.gap();
      const width =
        elementWidth * numberOfItemsToDisplay +
        (numberOfItemsToDisplay - 1) * gap;

      return this.width() ?? `${width}px`;
    });
    this.changeDetectorRef.detectChanges();
  }

  public next(): void {
    this._next$.next(null);
  }

  public previous(): void {
    this._previous$.next(null);
  }

  private addNextItemCopy(): void {
    const content = this.content();
    const currentIndex = this._currentItemIndex();
    const numberOfItemsToDisplay = this.numberOfItemsToDisplay();
    if (
      this.items().length < numberOfItemsToDisplay &&
      content &&
      currentIndex + numberOfItemsToDisplay >= content.items.length
    ) {
      this.items.update((items) => {
        const index =
          numberOfItemsToDisplay - (content.items.length - currentIndex);
        return items.concat(content.items[index] ?? []);
      });
    }
  }

  private addNextItemsCopies(): void {
    const content = this.content();
    const numberOfItemsToDisplay = this.numberOfItemsToDisplay();
    if (this.items().length < numberOfItemsToDisplay && content) {
      this.items.set(content.items);
    }
  }

  private getChildElement(index: number): HTMLElement {
    return this.carouselContentContainerRef().nativeElement.children[
      index
    ] as HTMLElement;
  }

  private refreshLoop$(
    condition: boolean,
    loopBeginingIndex: number,
    delayMs: number
  ): Observable<null | never> {
    return iif(
      () => condition,
      of(null).pipe(
        delay(delayMs),
        tap(() => this.scrollToLoopBegining(loopBeginingIndex))
      ),
      of(null)
    );
  }

  private scrollToLoopBegining(loopBeginingIndex: number): void {
    this.carouselContentContainerRef().nativeElement.style.scrollBehavior =
      'unset';
    this._currentItemIndex.set(loopBeginingIndex);
  }

  private scrollToNextItem(value: 1 | -1): void {
    this.carouselContentContainerRef().nativeElement.style.scrollBehavior =
      'smooth';
    this._currentItemIndex.update((index) => index + value);
  }

  private moveIndexBy(value: number): void {
    const numberOfChildren =
      this.carouselContentContainerRef().nativeElement.children.length;
    this._currentItemIndex.update(
      (index) => (numberOfChildren + (index + value)) % numberOfChildren
    );
  }
}
