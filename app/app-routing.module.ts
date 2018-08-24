import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatamappingComponent } from './datamapping/datamapping.component';
import { CreatenewdatamappingComponent } from './createnewdatamapping/createnewdatamapping.component';
import { ViewdatamappingComponent } from './viewdatamapping/viewdatamapping.component';
import { ImportdetailslistingComponent } from './importdetailslisting/importdetailslisting.component';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'datamapping', pathMatch: 'full' , data: {
    breadcrumb: [
      { name: "Rule Manager" , url: "/datamapping" }
    ],
    pageHeading: 'Rule Manager',
    subHeading: 'Rule Manager',
    navigation: [
      { name: "Data Mapping Table", url: "/datamapping" },
      { name: "Rule Table", url: "/defineworkflow/subworkflow" },
    ],
    navTabs: true
  }},
  {
    path: 'datamapping', component: DatamappingComponent, data: {
      breadcrumb: [
        { name: "Rule Manager" , url: "/datamapping" }
      ],
      pageHeading: 'Rule Manager',
      subHeading: 'Rule Manager',
      navigation: [
        { name: "Data Mapping Table", url: "/datamapping" },
        { name: "Rule Table", url: "/defineworkflow/subworkflow" },
      ],
      navTabs: true
    }
  },
  {
    path: 'datamapping/createnewdatamapping/:id', component: CreatenewdatamappingComponent, data: {
      gobackTo: "/datamapping",
      showBackbutton: true,
      breadcrumb: [
        { name: "Rule Manager" , url: "/datamapping" },
        { name: "Create New Datamapping Table" , url: "datamapping/createnewdatamapping" }
      ],
      pageHeading: 'Create New data Mapping Table',
      navTabs: false
    }
  },
  {
    path: 'datamapping/viewdatamapping/:id', component: ViewdatamappingComponent, data: {
      gobackTo: "/datamapping",
      showBackbutton: true,
      breadcrumb: [
        { name: "Rule Manager" , url: "/datamapping" },
        { name: "Data Mapping Table" , url: "datamapping/viewdatamapping" }
      ],
      pageHeading: 'Data Mapping Table',
      navTabs: false,
      showOkbutton:true
    }
  },
  {
    path: 'importdetails', component: ImportdetailslistingComponent, data: {
      gobackTo: "/datamapping",
      showBackbutton: true,
      breadcrumb: [
        { name: "Rule Manager" , url: "/datamapping" },
        { name: "Import Details" , url: "/importdetails" }
      ],
      pageHeading: 'Import Details',
      navTabs: false,
      showOkbutton:true
    }
  },
  { path: 'error/:code', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
