import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter, Input, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DefineRMService } from '../services/rm.service';
import { Http, Response, ResponseContentType } from '@angular/http';
import 'rxjs/Rx' ;


@Component({
  selector: 'app-importdetailslisting',
  templateUrl: './importdetailslisting.component.html',
  styleUrls: ['./importdetailslisting.component.scss']
})
export class ImportdetailslistingComponent implements OnInit {
  rows: any;
  temp: any = [];
  temp2: any = [];
  columns: any = [];
  headers: any = [];
  subHeading: string = "Import Details";
  pageSize:number;
  updatedColumns: any = [];
  currentPage:number;
  data = [];
  ListingItems: any = [];
  msg: any = {
    emptyMessage: '<div class="alert alert-warning"> No Files Imported. </div>'
  };
  classVar: any = {
    sortAscending: 'datatable-icon-down',
    sortDescending: 'datatable-icon-up'
  };
  appLoader = false;

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

  @ViewChild('editTmplAction')
  editTmplAction: TemplateRef < any > ;
  @ViewChild('hdrTplAction')
  hdrTplAction: TemplateRef < any > ;
  @ViewChild('editTmplCheck')
  editTmplCheck: TemplateRef < any > ;
  @ViewChild('hdrTplCheck')
  hdrTplCheck: TemplateRef < any > ;
  @ViewChild(DatatableComponent) table:DatatableComponent;
 
  constructor( private http: Http, private defineRMservice: DefineRMService) { }

  ngOnInit() {
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

    this.updatedColumns.push({
      cellTemplate: this.editTmplAction,
      headerTemplate: this.hdrTplAction,
      sortable: false,
      resizeable: false,
      draggable: false
    });
    this.columns = this.updatedColumns;

    this.fetch();
  }
  fetch(){
    let params = {'startIndex' : '0','numberOfRecords' : '10'};

    this.defineRMservice.getImportDataDetailsURL()
    .subscribe(data => {
      this.appLoader = false;
      const temprows = [];
      this.data= data;
      var i:number;
      for(i=0;i<this.data.length;i++)
      {
          temprows.push({
          filename: this.data[i].filename,
          importdate: this.data[i].importdate,
          status: this.data[i].status,
          errors: this.data[i].errors,
          data: this.data[i]
        });
      }




      this.rows = temprows;
      this.temp2 = this.rows;
    });

    this.headers=[
      { name: 'File Name', prop: 'filename'},
      { name: 'Import Date', prop:'importdate'},
      { name: 'Status', prop:'status'},
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
onPageSizeChanged(event) {
  this.table.limit = event;
  this.data = this.data.slice();
}
downloadFile(data: Response){
  var blob = new Blob([data], { type: 'text/csv' });
  var url= window.URL.createObjectURL(blob);
  window.open(url);
}

showError(){
  let params = {'path' : '417fcbea-8128-415f-b0ec-854d9c68ee4f/IREQUEST/402881c9-647f356d-0164-83d3c5df-0020/file','name' : '1 Mobile.png'};
  this.defineRMservice.getlinkerrorURL(params)
    .subscribe(data => this.downloadFile(data)),
    error => {},
    () => {};
}

}
