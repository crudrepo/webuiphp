import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DataService } from './data.service';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [NgbModule, TranslateModule]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
     
      ngModule: CoreModule,
      providers: [HttpClientService, AppService, DataService, NgbActiveModal]
    };
  }
}
