import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class DefineWfService {

  constructor(private http: Http,  private service: HttpClient) { }

  //MCW URLs
  private mcwListUrl: string = "../assets/tempData.json";
  private mcwViewUrl: string = "/api/workflow_config/default/getMCWView";
  private mcwImportUrl : string = "/api/workflow_config/default/getMCWImportData"
  private mcwImportStatus: string = "/api/common/default/getMCWImportStatus";
  private defineWFUrl: string="/api/defined_workflow/default/searchDefineWorkflowListing";

  // Import URL
  private importURL: string = "/api/common/default/getImportData";

  // Job Status URL
  private getJobStatusURL: string = "/api/common/default/getJobStatus";

  getMCWList() {
    return this.service.get(this.mcwListUrl);
  }

  getMCWView(params){
  	return this.service.post(this.mcwViewUrl,params);
  }

  //import data

  getImportData(params)
  {
  	return this.service.post(this.importURL,params);
  }
  getMCWImportData(params)
  {
  		return this.service.post(this.mcwImportUrl,params);
  }

  //import status
  getMCWImportStatus()
  {
  	return this.service.get(this.mcwImportStatus);
  }

  checkJobStatus(moduleName) {
    return this.service.get(this.getJobStatusURL+'?moduleName='+moduleName);
  }

  getDefineWfList() {
    return this.service.get(this.defineWFUrl);
  }

}
