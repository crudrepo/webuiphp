import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class ListingService{

  private url: string="assets/cult.json";
  private cultExportUrl: string="/api/common/default/getCULTExportData";
  private wcmExportUrl: string = "/api/common/default/getWCMExportData";
  private mcwExportUrl: string = "/api/common/default/getMCWExportData";
  
  result: any;
  
  constructor(private http: Http,  private service: HttpClient) { }

  getCultList() {
    return this.service.get(this.url);
  }
  
  
  getCULTExportData(params : any)
  {
  	return this.service.post(this.cultExportUrl,params )
  }
  
  getWCMExportData(params : any)
  {
  	return this.service.post(this.wcmExportUrl,params )
  }
  
  getMCWExportData(params : any)
  {
  	return this.service.post(this.mcwExportUrl,params )
  }

}
