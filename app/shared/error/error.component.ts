import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ERROR_MSG } from './error-config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() isPopup = false;
  @Input() data: any;
  showHideSolutionVar = false;
  browser = window.navigator.userAgent;

  errorMsg: string;
  constructor(private route: ActivatedRoute, private dataService: DataService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.dataService.isError.next(true);
    if (!this.isPopup) {
      this.route.params.subscribe(params => {
         this.data = +params['code'];
        this.errorMsg = ERROR_MSG[params['code']];
      });
    } else {
        this.errorMsg = ERROR_MSG[this.data];
    }
  }

  closeModal() {
    this.activeModal.dismiss('Close click');
  }

  showHideSolution() {
    this.showHideSolutionVar = !this.showHideSolutionVar;
    const element = document.getElementById('solution-icon');
    element.classList.toggle('left');
  }

}
