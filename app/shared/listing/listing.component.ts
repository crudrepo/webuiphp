import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter, Input, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { DefineRMService } from '../../services/rm.service';

import { ServiceParams } from '../../models/service-params';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Subject } from 'rxjs/Subject';
import { Page } from '../../models/page';
import { ListingService } from './listing.service';
import { debounceTime } from 'rxjs/operator/debounceTime';
import * as _ from 'lodash';
import 'rxjs/add/operator/filter';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  // providers: [WfConfigService, DefineWfService, NgbDropdownConfig, ListingService],
  providers: [NgbDropdownConfig, ListingService],
  inputs: ['rows', 'columns', 'msg', 'mode' , 'scroll' , 'count' , 'offset' , 'limit' ]
})
export class ListingComponent implements OnInit {
  @Output() pageChange = new EventEmitter();
  rows: any;
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
  checkmode : string;
  mode:string;
  scroll:boolean = false;
  count:any;
  offset:any;
  limit:any;

  @ViewChild('editTmplAction')
  editTmplAction: TemplateRef < any > ;
  @ViewChild('hdrTplAction')
  hdrTplAction: TemplateRef < any > ;
  @ViewChild('editTmplCheck')
  editTmplCheck: TemplateRef < any > ;
  @ViewChild('hdrTplCheck')
  hdrTplCheck: TemplateRef < any > ;
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

  constructor( private translate: TranslateService,private router: Router, private listingService: ListingService, private activatedRoute: ActivatedRoute, config: NgbDropdownConfig, private common:CommonService,@Inject(LOCAL_STORAGE) private storage: WebStorageService ,private DefineRMServiceObj :DefineRMService) {
    /* customize default values of dropdowns used by this component tree */
    config.placement = 'bottom-right';
    //config.autoClose = false;
  }

  ngOnInit() {
    this.checkmode = this.mode;
    this.table.limit = 10;
    this.currentPage = 1;
    this.pageSize = 10;
    this.updatedColumns.push({
      //cellTemplate: this.editTmplCheck,
      //headerTemplate: this.hdrTplCheck,
      maxWidth: 65,
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

  getExportData() {
    var codes = [];

    for (var i in this.allRecordedState) {
      if(this.allRecordedState[i])
      codes.push(i);
    }

    if(codes.length){
      window.open('/api/common/default/getExportData?moduleName='+this.module+'&codes='+codes.concat(), '_blank');
   } else {
  document.getElementById("FailMessage").style.display = 'block';
  setTimeout(function() {
    document.getElementById("FailMessage").style.display = 'none';
  }, 2000);
}

}

getCurrentView(row)
{
  this.router.navigate(['datamapping/viewdatamapping',row.data['mappingTableId']])
}

isAllChecked() {
  if (!this.rows.length) {
    return false;
  }
  return this.rows.every(_ => _.state);
}

checkAll(ev) {
  this.rows.forEach(x => {
    x.state = ev.target.checked;
    this.allRecordedState[x.code] = x.state;
  });
}

editAction(row) {

  this.DefineRMServiceObj.setCurrentRowData(row);
  this.router.navigate(['datamapping/createnewdatamapping', row.data['mappingTableId'] ])

}

deleteAction(row){
  var workflowId = row.workflowId;
  this.common.deleteWorkflowInfo(workflowId)
  .subscribe(result => {
    if (result["result"] == 'SUCCESS') {
      document.getElementById("successMessage").style.display = 'block';
      setTimeout(function() {
        document.getElementById("successMessage").style.display = 'none';
      }, 2000);
    } else {
      document.getElementById("FailMessage").style.display = 'block';
      setTimeout(function() {
        document.getElementById("FailMessage").style.display = 'none';
      }, 2000);
    }
  });
}

deactivateAction(row){
  var workflowId = row.workflowId;
}

generateArray(obj) {
  return Object.keys(obj).map((key) => ({
    key: key,
    value: obj[key]
  }));
}

isAnyChecked() {
  let flag = false;
  let allRecordedState = [];

  if (Object.keys(this.allRecordedState).length) {
    allRecordedState = this.generateArray(this.allRecordedState);
  }
  allRecordedState.forEach(_ => {
    if (_.value) {
      flag = true;
    }
  });
  return flag;
}

recordState(id, value) {
  this.allRecordedState[id] = value;
}

CreateNew() {
  this.router.navigateByUrl('defineworkflow/createworkflow');
}


onPageSizeChanged(event) {
  this.table.limit = event;
  this.data = this.data.slice();
}
setPage(pageInfo){
  this.pageChange.emit(pageInfo); 
 console.log(pageInfo);
}

}
