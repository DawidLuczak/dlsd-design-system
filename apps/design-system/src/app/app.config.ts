import { registerLocaleData } from '@angular/common';
import { HttpBackend, provideHttpClient } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { appRoutes } from './app.routes';
import { PageTitleStrategy } from './core/services/page-title-strategy.service';

registerLocaleData(localePl);

export const createTranslateLoader = (http: HttpBackend) =>
  new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/' },
    { prefix: './assets/i18n/dlsd-angular-ui/' },
  ]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'pl',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpBackend],
        },
      })
    ),
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategy,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pl',
    },
  ],
};
