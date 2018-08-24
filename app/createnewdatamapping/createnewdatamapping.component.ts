import { Component, OnInit , ViewEncapsulation ,ViewChild , TemplateRef} from '@angular/core';
import { DefineRMService } from '../services/rm.service';
import { Ste2ListingComponent } from '../shared/ste2-listing/ste2-listing.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-createnewdatamapping',
  templateUrl: './createnewdatamapping.component.html',
  styleUrls: ['./createnewdatamapping.component.scss'],
  //providers: [DefineRMService],
  encapsulation: ViewEncapsulation.None
})
export class CreatenewdatamappingComponent implements OnInit {
  currComp : string = "";
  currRowData = "";
  appLoader = true;
  tableName : string = "";
  uuid : string = "";
  desc : string = "";
  ListingItems = [];
  rows: any = [];
  headers: any = [];
  saveContinue : boolean = false;
  saveDraft : boolean = false;
  ok : boolean = true;
  msg: any = {
    emptyMessage: '<div class="alert alert-warning m-5"> No records found. </div>'
  };
  updatedColumns: any = [];
  columns: any = [];
  @ViewChild("step1") step1 : Step1Component;
  @ViewChild("tabData") tabData ;
  slideup:boolean = true;
  constructor(private defineRMservice: DefineRMService , private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

    (( w, d ) => {
      let slideup = false;
      w.addEventListener( 'scroll', () => {

        if ( w.innerHeight + w.scrollY === d.documentElement.scrollHeight ) {
            slideup = true;
        }
        else{
            slideup = false
        }
        this.slideup = slideup
      });
    })( window, document );

    this.activatedRoute.params.subscribe(params => {
    });
   this.currRowData = this.defineRMservice.getCurrentRowData();
    if(this.currRowData != "") {
      this.fetch();
    } else
    {
      this.appLoader = false;
    }
  }
  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-selectbyid1' || $event.nextId === 'tab-selectbyid2') {
      //$event.preventDefault();
      this.saveContinue = false;
      this.saveDraft = false;
      this.ok = true;


    }
    else
    {
      this.saveContinue = true;
      this.saveDraft = true;
      this.ok = false;
    }
      this.slideup = false;

  };
   fetch(){
   this.defineRMservice.getTableInfoData({mappingTableId:this.currRowData['data']['mappingTableId']})
    .subscribe(data => {
      this.defineRMservice.setDataForSteps(data);
      this.tableName =  data['mappingTableContainer']['mappingTableName'];
      this.uuid =  data['mappingTableContainer']['mappingTableId'];
      this.desc =  data['mappingTableContainer']['description'];
      this.appLoader = false;
    });
  }
  saveData(val :any) {
    this.currComp = this.defineRMservice.getCurrentComponentName();

    if(this.currComp == "Step1")
    {
      this.tabData.select('tab-selectbyid2');
      this.saveContinue = false;
      this.saveDraft = false;
      this.ok = true;
    }
    else if(this.currComp == "Step2")
    {
      this.tabData.select('tab-selectbyid3');
      this.saveContinue = true;
      this.saveDraft = true;
      this.ok = false;
    }

  }


}
