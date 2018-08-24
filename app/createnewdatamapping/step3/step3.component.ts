import { Component, OnInit, TemplateRef, ViewChild , Output, EventEmitter, Input, ElementRef, AfterViewInit, Inject} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DefineRMService } from '../../services/rm.service';
import { DataService } from '../../core/data.service';
import { ImportFileModalComponent } from '../import-file-modal/import-file-modal.component';
import { CreatenewdatamappingService } from '../createnewdatamapping.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
 
})
export class Step3Component implements OnInit {

  success:any = false;
  uploadProgress:any = false;
  breadcrumb: Array < any > ;
  subHeading: string = "Data Mapping Table";
  moduleName: string;
  ListingItems = [];
  rows: any = [];
  temp: any = [];
  temp2: any = [];
  columns: any = [];
  headers: any = [];
  appLoader = true;
  data = [];
  mappingTableId: any;
  viewdatamapping: string;
  count=0;
  offset=0;
  limit=10;
  startIndex = 0;
  _importFile:any;
  msg: any = {
    emptyMessage: '<div class="alert alert-warning m-5"> No records found. </div>'
  };
  obj:any;
  scroll:boolean;
  @ViewChild("importFile") importFileRef:ElementRef;
  constructor( private defineRMservice: DefineRMService, private route: ActivatedRoute, private dataService: DataService,private createNewDatamappingService : CreatenewdatamappingService ) {}

  ngOnInit() {
    this._importFile = () => this.dataService.showPopup(() =>{this.success = true;}, ImportFileModalComponent);
       this.scroll = true;
    this.viewdatamapping = "ViewDatamapping";
    this.route.params.subscribe(params => {
    this.mappingTableId = params.id;
    this.createNewDatamappingService.setMappingTableId(params.id);
    this.createNewDatamappingService.successFlag$.subscribe(val => { this.success = val; });
    this.createNewDatamappingService.uploadProgressFlag$.subscribe(val => { this.uploadProgress = val; });
    
    });
    this.obj = {
      "mappingTableId":this.mappingTableId,
      "startIndex":0,
      "numberOfRecords":10,
      "order":"desc",
      "getMappingData":true
    }
    this.uploadStatus(this.obj);
    this.fetch(this.obj);
  }
  uploadStatus(obj)
  {
    
    this.defineRMservice.getUploadStatusData(obj)
    .subscribe(data => {
         if(data['result']['uploadInProgress'])
        {
          this.importFileRef.nativeElement.removeEventListener('click', this._importFile);
          this.createNewDatamappingService.uploadProgressStatus(true);
        }
        else
        {
          this.importFileRef.nativeElement.addEventListener('click', this._importFile);
        }



    });
  }
  /*Create Table*/
  fetch(obj){
    //let params = {'mappingTableId':obj.map_id,'getMappingData':true,'startIndex':obj.startIndex,"order":obj.order,"numberOfRecords":obj.numberOfRecords};
    this.defineRMservice.getTableInfoData(obj)
    .subscribe(data => {
      
         let columnData = data['mappingTableContainer']['columnDetails'];
        let rowData = data['mappingData']['rowDetails'];
        this.count = data['mappingData']['totalRecords'];
       // this.offset = data['mappingData']['startIndex'];
        
        
        
        this.headers.push({name : "Id",prop:"id"});
        this.headers.push({name : "Status",prop:"status"});
        for(let i=0;i<columnData.length;i++)
        {
          this.headers.push({
            name : columnData[i]['columnName'],
            prop : columnData[i]['entityUniqueId']
          });
        }

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
        const temprows = [];
        for(let i=0;i<rowData.length;i++)
        {
              let obj = {};
              obj['data'] = rowData[i];
              obj['id'] = rowData[i]['id'];
              obj['status'] = (rowData[i]['status'] == 'Y') ? "Active" : "Inactive";

              Object.keys(rowData[i]['data']).forEach(key => {
                obj[key] = rowData[i]['data'][key];
            });
            temprows.push(obj);
        }
        this.rows = temprows;
        this.temp2 = this.rows;
        this.appLoader = false;
    });

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
 
  exportFile(getOnlyTemplate)
  {
    var mappingTableId = this.createNewDatamappingService.getMappingTableId();
    this.createNewDatamappingService.exportFile(mappingTableId,getOnlyTemplate);
  }
  setPage(pageInfo)
  {
    //this.rows = [];
    this.appLoader = true;
    console.log(pageInfo);
    
    let obj = Object.assign({},this.obj);
    obj["startIndex"] = pageInfo.offset*this.limit;
    obj["numberOfRecords"] = this.limit;
    this.fetch(obj);

    
    
    
    //this.fetch(this.mappingTableId);
  }
}
