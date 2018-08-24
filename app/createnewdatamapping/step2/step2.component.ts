import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter, Input, ElementRef, AfterViewInit, Inject} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/filter';
import { DefineRMService } from '../../services/rm.service';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  rows: any = [];
  temp: any = [];
  temp2: any = [];
  columns: any = [];
  headers: any = [];
  filterColumns: any = [];
  appLoader = true;
  data = [];
  msg: any = {
    emptyMessage: '<div class="alert alert-warning m-5"> No records found. </div>'
  };
  classVar: any = {
    sortAscending: 'datatable-icon-down',
    sortDescending: 'datatable-icon-up'
  };

  constructor(public activeModal: NgbActiveModal, private router: Router,  private defineRMservice: DefineRMService , private activatedRoute: ActivatedRoute, private modalService: NgbModal, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {

  }

  ngOnInit() {
    this.defineRMservice.setCurrentComponentName("Step2");
    this.fetch();
  }

  /*Create Table*/
  fetch(){
    let params = {'startIndex' : '0','numberOfRecords' : '10'};
    this.data = this.defineRMservice.getDataForSteps()['mappingTableContainer']['columnDetails'];
    this.appLoader = false;
    const temprows = [];

    var i:number;
    for(i=0;i<this.data.length;i++)
    {
      var tmp_column_type = this.data[i]['columnType'];
        if(this.data[i]['columnType'] == "CUSTOM_MASTER")
        {
          tmp_column_type = "Custom Master";
        }
        else if(this.data[i]['columnType'] == "STANDARD_MASTER")
        {
          tmp_column_type = "Standard Master";
        }
          temprows.push({
          sr_no : (i+1),
          column_name: this.data[i]['columnName'],
          //column_type: this.data[i]['columnType'],
          column_type: tmp_column_type,
          refer_master: this.data[i]['referenceFieldName'],
          data: this.data[i]
          });
    }
      this.rows = temprows;
      this.temp2 = this.rows;



    this.headers=[
      { name: 'Column Name', prop:'column_name'},
      { name: 'Column Type', prop:'column_type'},
      { name: 'Refer Master', prop:'refer_master'},
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

}
