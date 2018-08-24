import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter, Input, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DefineRMService } from '../../services/rm.service';

import { ServiceParams } from '../../models/service-params';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Subject } from 'rxjs/Subject';
import { Page } from '../../models/page';
import { debounceTime } from 'rxjs/operator/debounceTime';
import * as _ from 'lodash';
import 'rxjs/add/operator/filter';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-step2-listing',
  templateUrl: './ste2-listing.component.html',
  styleUrls: ['./ste2-listing.component.scss'],
  inputs: ['rows', 'columns', 'msg'],
  providers: [NgbDropdownConfig]
})
export class Ste2ListingComponent implements OnInit {
  deleteFlag:boolean=true;
  rows: any = [];
  loadingIndicator: any;
  updatedColumns: any = [];
  columns: any;
  reorderable: any;
  msg: any;
  module:any;
  isCreateWorkflow = false;
  subHeading: any;
  allRecordedState: any = {};
  data = [];
  pageSize:number;
  currentPage:number;
  appLoader = false;
  @ViewChild('editTmplAction')
  editTmplAction: TemplateRef < any > ;
  @ViewChild('hdrTplAction')
  hdrTplAction: TemplateRef < any > ;
  @ViewChild('editTmplCheck')
  editTmplCheck: TemplateRef < any > ;
  @ViewChild('hdrTplCheck')
  hdrTplCheck: TemplateRef < any > ;

  @ViewChild('hdrStep2RowNumber')
  hdrStep2RowNumber: TemplateRef < any > ;
  @ViewChild('step2RowNumber')
  step2RowNumber: TemplateRef < any > ;




  @ViewChild(DatatableComponent) table:DatatableComponent;
  limitOptions = [
    {
      key: '10',
      value: 10
    },
    {
      key: '20',
      value: 20
    },
    {
      key: '30',
      value: 30
    }
  ];

  constructor(private router: Router,
     private activatedRoute: ActivatedRoute,
     config: NgbDropdownConfig,
     @Inject(LOCAL_STORAGE) private storage:
     WebStorageService ,
     private DefineRMServiceObj :DefineRMService) {
    /* customize default values of dropdowns used by this component tree */
    config.placement = 'bottom-right';
    //config.autoClose = false;
     }

  ngOnInit() {
    this.table.limit = 10;
    this.currentPage = 1;
    this.pageSize = 10;
    this.updatedColumns.push({
      cellTemplate: this.step2RowNumber,
      headerTemplate: this.hdrStep2RowNumber,
       sortable: true,
      resizeable: false,
      draggable: false,
    });

    for (var item in this.columns) {
      this.updatedColumns.push(this.columns[item]);
    }

    this.activatedRoute.params.subscribe(params => {
      /* this.module = params['modulename'].toLowerCase(); */
      if(this.module == 'completeworkflow'){
        this.isCreateWorkflow = true;
      }
    });

    this.updatedColumns.push({
      cellTemplate: this.editTmplAction,
      headerTemplate: this.hdrTplAction,
      sortable: false,
      resizeable: false,
      draggable: false
    });
    this.columns = this.updatedColumns;
  }

  }
