import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {HttpClientService} from '../core/http-client.service';
import { Subject }    from 'rxjs';
@Injectable()
export class CreatenewdatamappingService {
  private mappingTableId : string;
  private importResponse = new Subject<string>();
  private uploadProgress = new Subject<string>();
  
  constructor(private httpService: HttpClientService) { }
  successFlag$ = this.importResponse.asObservable();
  uploadProgressFlag$ = this.uploadProgress.asObservable();
  importFile(params) {
    return this.httpService.formPost('/rulesmanager/rule/default/importFile', params);
  }
  setMappingTableId(id:string)
  {
    this.mappingTableId = id;
  }
  getMappingTableId()
  {
    return this.mappingTableId;
  }
  responseFromImportModal(val:any) {
    this.importResponse.next(val);
  }
  uploadProgressStatus(val)
  {
    this.uploadProgress.next(val);
  }
  exportFile(mappingTableId,getOnlyTemplate)
  {
      window.location.href = "/rulesmanager/rule/default/exportFile?mappingTableId="+mappingTableId+"&getOnlyTemplate="+getOnlyTemplate;
  }
}
