import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter, Input, ElementRef, AfterViewInit, Inject} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ListingComponent } from '../shared/listing/listing.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/filter';
import { TranslateService } from '@ngx-translate/core';
import { DefineRMService } from '../services/rm.service';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-datamapping',
  templateUrl: './datamapping.component.html',
  styleUrls: ['./datamapping.component.scss'],
 })
export class DatamappingComponent implements OnInit {

  breadcrumb: Array < any > ;
  subHeading: string = "Data Mapping Table List";
  moduleName: string;
  closeResult: string;
  fileTypes = ['.xls', '.xlsx'];
  file: any;
  ListingItems = [];
  activeJobId: string;
  rows: any = [];
  temp: any = [];
  temp2: any = [];
  columns: any = [];
  headers: any = [];
  filterColumns: any = [];
  statusCall: Subscription;
  modalReference : NgbModalRef;
  appLoader = true;
  data = [];
  listdatamapping: any;
  count=0;
  offset=0;
  limit=10;
  startIndex = 0;
  msg: any = {
    emptyMessage: '<div class="alert alert-warning m-5"> No records found. </div>'
  };
  classVar: any = {
    sortAscending: 'datatable-icon-down',
    sortDescending: 'datatable-icon-up'
  };

  constructor(private translate: TranslateService,public activeModal: NgbActiveModal, private router: Router,  private defineRMservice: DefineRMService , private activatedRoute: ActivatedRoute, private modalService: NgbModal, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {

  }

  ngOnInit() {
    let obj = {
      startIndex : "0",
      numberOfRecords : this.limit
    }
    this.fetch(obj);
  }

  /*Create Table*/
  fetch(obj){
    
    this.defineRMservice.getDataMappingURL(obj)
    .subscribe(data => {
      this.appLoader = false;
      this.subHeading = "Data Mapping Table List";
      const temprows = [];
      this.data= data;
      let content : any;
      content = data['content'];
      for(let i=0;i<content.length;i++)
      {
        temprows.push({
          name: content[i].mappingTableName,
          status: content[i].status,
          data: content[i]
        });
      }

      this.count = content.length;


      this.rows = temprows;
      this.temp2 = this.rows;
    });

    this.headers=[
      { name: 'Table Name / Code', prop: 'name'},
      { name: 'Status', prop:'status'}

    ];

    const cols = [];

    cols.push();
    this.headers.forEach(column => {
        cols.push({
            prop: column.prop,
            name: column.name,
            sortable: true,
            resizeable: false,
            draggable: false,
            headerClass: ''
        });
    });
    this.columns = cols;
    this.listdatamapping = 'listdatamapping';
  }
  /*Search Filter*/
updateFilter(event){
  const val = event.target.value.toLowerCase();
   this.rows = this.temp2;
  if(val != ""){
    this.rows = this.temp2.filter(function(item) {
      if(item.name.toLowerCase().indexOf(val) !== -1 || !val){
        return true;
      }
    });

  }

}
setPage(pageInfo)
  {
    //this.rows = [];
    this.appLoader = true;
    console.log(pageInfo);
    
    
  let obj = {
      "startIndex":pageInfo.offset*this.limit,
      "numberOfRecords":this.limit,
    }
    this.fetch(obj);

    
    
    
    //this.fetch(this.mappingTableId);
  }
}
