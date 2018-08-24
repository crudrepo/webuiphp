
import { Component, OnInit , ViewEncapsulation ,ViewChild , TemplateRef ,Input} from '@angular/core';
import { DefineRMService } from '../../services/rm.service';
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})

export class Step1Component implements OnInit {
  @Input() appLoader: boolean = true;
  private dataForSteps : string = "";
   @Input() tableName : string = "";
   @Input() uuid : string = "";
   @Input() desc : string = "";

  constructor(private defineRMService :DefineRMService ) { }

  ngOnInit() {
    this.defineRMService.setCurrentComponentName("Step1");

  }
  setStep1Data()
  {
    this.dataForSteps = this.defineRMService.getDataForSteps();
    this.tableName =  this.dataForSteps['mappingTableName'];
    this.uuid =  this.dataForSteps['mappingTableId'];
    this.desc =  this.dataForSteps['description'];
  }

}
