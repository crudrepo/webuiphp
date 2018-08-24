import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class WfConfigService{

  // CULT URLs
  private cultListUrl: string = "/api/workflow_config/default/searchCULTlisting";
  private cultViewUrl: string = "/api/workflow_config/default/getCULTView";
  private cultImportUrl: string = "/api/common/default/getCULTImportData";
  private cultImportStatus: string = "/api/common/default/getCULTImportStatus";
  
  //WCM URLs
  private wcmListUrl: string = "/api/workflow_config/default/searchConditionMaplisting";
  private wcmViewUrl: string = "/api/workflow_config/default/getWCMView";
  private wcmImportUrl : string = "/api/workflow_config/default/getWCMImportData";
  private wcmImportStatus: string = "/api/common/default/getWCMImportStatus";
  
  // Import URL
  private importURL: string = "/api/common/default/getImportData";

  // Job Status URL
  private getJobStatusURL: string = "/api/common/default/getJobStatus";
  
  // Static Data for testing
  private staticData = 'assets/cult.json';
  private viewData = 'assets/view.json';


  constructor(private http: Http,  private service: HttpClient) { }

  // listing
  getCultList() {
    return this.service.get(this.cultListUrl);
  }
  
  getConditionalMapList() {
    return this.service.get(this.wcmListUrl);
  }
  
  // views
  getWCMView(params) {
    return this.service.post(this.wcmViewUrl,params);
  }
  
  getCultView(params) {
    return this.service.post(this.cultViewUrl,params);
  }
  

  // import data
  getImportData(params)
  {
    return this.service.post(this.importURL,params);
  }
  
  checkJobStatus(moduleName) {
    return this.service.get(this.getJobStatusURL+'?moduleName='+moduleName);
  }
  
  
  // import status
  getWCMImportStatus()
  {
  	return this.service.get(this.wcmImportStatus);
  }
  
  getCUlTImportStatus()
  {
  	return this.service.get(this.cultImportStatus);
  }
  
}
