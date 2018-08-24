import { Injectable ,Input} from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {HttpClientService} from '../core/http-client.service';

@Injectable()
export class DefineRMService {
  private currentComponentName :string;
  private tableInfo : string;
  private currentRowData : string ="";
  private dataForSteps : string = "";
  private dataMappingListUrl: string = "/rulesmanager/rule/default/getMappingTableList";
  private dataTableInfoURL: string = "/rulesmanager/rule/default/getMappingTableInfo";
  private mcwViewUrl: string = "/api/workflow_config/default/getMCWView";
  private mcwImportUrl : string = "/api/workflow_config/default/getMCWImportData"
  private mcwImportStatus: string = "/api/common/default/getMCWImportStatus";
  private defineWFUrl: string="/api/defined_workflow/default/searchDefineWorkflowListing";
  private importURL: string = "/api/common/default/getImportData";
  private editListUrl: string = "/rulesmanager/rule/default/getMappingTableInfo";
  private getJobStatusURL: string = "/api/common/default/getJobStatus";
  private importDataInfo: string = "../assets/importdatainfo.json";
  private linkerrorURL: string = "/rulesmanager/rule/default/getlinkerrorURL";
  private uploadStatusURL:string = "/rulesmanager/rule/default/uploadStatusData";
  constructor(private http: Http,  private service: HttpClient, private httpService: HttpClientService  ) { }
  
  setCurrentComponentName(name : string) {
    this.currentComponentName = name;
  }
  getCurrentComponentName() {
    return this.currentComponentName;
  }


  setDataForSteps(data) {
    this.dataForSteps = data;
  }

  getDataForSteps() {
    return this.dataForSteps;
  }

  setCurrentRowData(data:string) {
    this.currentRowData = data;
  }
  getCurrentRowData() {
    return this.currentRowData ;
  }
   setTableInfo(data: string) {
    this.tableInfo = data;
  }
  getTableInfo() {
    return this.tableInfo;
  }  
  
    getDataMappingURL(params) {
        return this.httpService.post(this.dataMappingListUrl,params);
  }
  getTableInfoData(params) {
      return this.httpService.post(this.dataTableInfoURL,params);
    }
  
  getImportDataDetailsURL(){
    return this.httpService.get(this.importDataInfo);
  }
  getImportDataInfoURL(params){
    return this.httpService.post(this.editListUrl,params);
  }

  getlinkerrorURL(params){
    return this.httpService.post(this.linkerrorURL,params);
 }
getUploadStatusData(params)
{
  return this.httpService.post(this.uploadStatusURL,params);

}


  /*getMCWList() {
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
*/
}
