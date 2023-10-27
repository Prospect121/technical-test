import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { locale as esLang } from '../assets/i18n/es';
import { locale as enLang } from '../assets/i18n/en';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { DatePipe, registerLocaleData } from '@angular/common';
import { spinnerInterceptor } from './core/middlewares/spinner.interceptor';
import { SpinnerModule } from './shared/components/spinner/spinner.module';

registerLocaleData(localeEs);
registerLocaleData(localeEn);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: spinnerInterceptor,
      multi: true,
    },
    provideNgxMask(),
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private _translate: TranslateService) {
    this._loadTranslations(enLang, esLang);
    const browserLang = this._translate.getBrowserLang();
    this._translate.use(this._translate.getDefaultLang());
    this._translate.use(browserLang?.match(/en|es/) ? browserLang : 'en');
  }

  private _loadTranslations(...args: { lang: string; data: any }[]): void {
    const locales = [...args];
    let langIds: any[] = [];
    locales.forEach((locale) => {
      this._translate.setTranslation(locale.lang, locale.data, true);
      langIds = [...langIds, locale.lang];
    });
    this._translate.addLangs(langIds);
  }
}
