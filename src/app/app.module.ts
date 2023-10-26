import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { locale as esLang } from '../assets/i18n/es';
import { locale as enLang } from '../assets/i18n/en';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, TranslateModule.forRoot()],
  providers: [],
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
