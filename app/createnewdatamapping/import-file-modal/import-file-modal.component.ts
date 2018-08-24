import { Component, OnInit } from '@angular/core';
import { CreatenewdatamappingService } from '../createnewdatamapping.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../core/data.service';
@Component({
  selector: 'app-import-file-modal',
  templateUrl: './import-file-modal.component.html',
  styleUrls: ['./import-file-modal.component.scss'],
})
export class ImportFileModalComponent implements OnInit {
  fileName : string
  fileData: any = {};
  mappingTableId : string;
  private dataService: DataService;
  constructor(public activeModal: NgbActiveModal, private service: CreatenewdatamappingService) { }

  ngOnInit() {
    this.mappingTableId = this.service.getMappingTableId();
  }

  closeModal() {
    this.activeModal.dismiss('Close click');
    //this.dataService.closePopup();
  }

  fileChangeEvent(fileInput: any) {
    this.fileData.valid = false;
    this.fileData.dirty = false;
    this.fileData.invalidSize = false;
    let name = '';
    let size = 0;
    let flag = true;
    if (fileInput.target.files && fileInput.target.files[0]) {
      name = fileInput.target.files[0].name;
      size = parseFloat((fileInput.target.files[0].size / (1024 * 1024)).toFixed(2));
      this.fileData.name = name;
      this.fileData.dirty = true;
      if (size > 10) {
        this.fileData.invalidSize = true;
      } else if ((/\.(xlsx|xls)$/i).test(name)) {
        flag = false;
        this.fileData.valid = true;
        this.fileData.fileInput = fileInput.target.files[0];
      }
      if (flag) {
        this.fileData.name = '';
        this.fileData.valid = false;
      }
    } else {
      this.fileData.name = '';
    }
  }

  submitFile() {
    let data: FormData  =  new  FormData();
    data.append('file',  this.fileData.fileInput);
    data.append('mappingTableId',this.mappingTableId);
    
    this.fileData.valid = false;
    this.service.importFile(data).subscribe(
      res => {
        if(res['status'] && res['result']['basicValidationPass'])
        {
          this.fileData.valid = true;
          this.activeModal.dismiss('Close click');
          this.service.responseFromImportModal(true);
        }
      }
    );
  }
  exportFile(getOnlyTemplate)
  {
     this.service.exportFile(this.mappingTableId,getOnlyTemplate);
  }

}
