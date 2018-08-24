import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClassicHeaderComponent } from './classic-header/classic-header.component';
import { TabComponent } from './classic-header/tab/tab.component';
import { ListingComponent } from './listing/listing.component';
import { FiltersComponent } from './filters/filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionfooterbarComponent } from './actionfooterbar/actionfooterbar.component';
import { Ste2ListingComponent } from './ste2-listing/ste2-listing.component';
import { LoaderComponent } from './loader/loader.component';
import { ModalComponent } from './modal/modal.component';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    RouterModule  ,
    NgbModule,
    TranslateModule
    
  ],
  declarations: [ModalComponent,ErrorComponent, ListingComponent, FiltersComponent, HeaderComponent, ClassicHeaderComponent, TabComponent, FooterComponent, ViewComponent, ActionfooterbarComponent, Ste2ListingComponent,LoaderComponent,ToastMessageComponent],
  exports: [ModalComponent,ErrorComponent, ListingComponent, FiltersComponent, ClassicHeaderComponent, HeaderComponent, FooterComponent,ActionfooterbarComponent ,Ste2ListingComponent,LoaderComponent,ToastMessageComponent,TranslateModule],
})
export class SharedModule { }
