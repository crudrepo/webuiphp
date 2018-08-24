import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class CommonService {

  constructor(private service: HttpClient, private http:Http) { }

  //common service urls
  
  private productNames = '/api/common/default/getProductNames';
  private processNames = '/api/common/default/getAllProcesses';
  private currenciesName = '/api/common/default/getCurrencies';
  private tagName = '/api/common/default/getTags';
  private wcmCode = '/api/common/default/getWCMCodes';
  private workflowInfo = '/api/common/default/getWorkflowInfo';
  private workflowConditions = '/api/common/default/getWorkflowConditions';
  private saveWorkflowDraftURL = '/api/common/default/saveWorkflowDraft';
  private saveWorkflowDraftPut = '/api/common/default/saveWorkflowDraftPut';
  private deleteWorkflow = '/api/common/default/deleteWorkflow';
  
   
    
  //get products
  getProductNames() {
    return this.service.get(this.productNames);
  }
  
  //get currencies
  getCurrencies() {
    return this.service.get(this.currenciesName);
  }
  
  //get processes
  getProcessNames() {
    return this.service.get(this.processNames);
  }
  
  //get Tags
  getTags() {
    return this.service.get(this.tagName);
  }
  
  //get WCM Codes
  getWCMCodes(params){
  	return this.service.get(this.wcmCode+'?currency='+params.currency+'&processCode='+params.process);
  }
  
  getWorkflowConditions(params){
  	return this.service.get(this.workflowConditions+'?code='+params);
  }
  
  //save draft edit
  saveUpdatedWorkflowDraft(params){
   return this.http
        .put(this.saveWorkflowDraftPut, params)
        .map(this.extractData)
        .catch(this.handleError);
  }
  
  //get workflow information
  getWorkflowInfo(params){
  	return this.service.get(this.workflowInfo+'?workflowId='+params);
  }
  
  //save draft
  saveWorkflowDraft(params){
  	return this.service.post(this.saveWorkflowDraftURL, params);
  }
  
  //delete workflow
  deleteWorkflowInfo(params){
  	return this.service.post(this.deleteWorkflow, params);
  }
  
   extractData(res: Response) {
        let body = res.json();
        return body || {};
   }
  
  handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
  // redirect to workflow
  redirectToWorkflow(params){
  	//window.location.href = this.dummy + 'params';
  }
  
  
}
