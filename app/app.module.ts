import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { StorageServiceModule} from 'angular-webstorage-service';
import { DataService } from './core/data.service';
import { AppService } from './core/app.service';
import { RoutingStateService } from './services/routing-state.service';
import { HttpClientModule } from '@angular/common/http';
import { ClassicSubHeaderComponent } from './shared/classic-sub-header/classic-sub-header.component';
import { TabComponent } from './shared/classic-sub-header/tab/tab.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { DatamappingComponent } from './datamapping/datamapping.component';
import { CreatenewdatamappingComponent } from './createnewdatamapping/createnewdatamapping.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ViewdatamappingComponent } from './viewdatamapping/viewdatamapping.component';
import { Step1Component } from './createnewdatamapping/step1/step1.component';
import { Step2Component } from './createnewdatamapping/step2/step2.component';
import { Step3Component } from './createnewdatamapping/step3/step3.component';
import { DefineRMService } from './services/rm.service';
import { ImportFileModalComponent } from './createnewdatamapping/import-file-modal/import-file-modal.component';
import { ImportdetailslistingComponent } from './importdetailslisting/importdetailslisting.component';
import { CreatenewdatamappingService } from './createnewdatamapping/createnewdatamapping.service';

@NgModule({
  declarations: [
    AppComponent,
    ClassicSubHeaderComponent,
    TabComponent,
    DatamappingComponent,
    CreatenewdatamappingComponent,
    ViewdatamappingComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    ImportFileModalComponent,
    ImportdetailslistingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    StorageServiceModule,
    CoreModule,
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxDatatableModule,
    NgbModule.forRoot()
  ],
   
  providers:[
    DefineRMService,CreatenewdatamappingService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ImportFileModalComponent]
})
export class AppModule { }
