import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { DefineRMService } from '../../services/rm.service';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
@Component({
  selector: 'app-actionfooterbar',
  templateUrl: './actionfooterbar.component.html',
  styleUrls: ['./actionfooterbar.component.scss']
})
export class ActionfooterbarComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  showOkbutton:boolean;
  compName : string;
  @Input() saveContinue : boolean ;
  @Input() saveDraft : boolean;
  @Input() ok : boolean;
  @Input() slideup:boolean;

  constructor(private DefineRMService : DefineRMService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
     this.compName = this.route.component['name'];
  }
  saveData(event)
  {
    this.valueChange.emit(true);
  }
  cancelAction() {
    this.router.navigate(['datamapping/'])
  }


}
