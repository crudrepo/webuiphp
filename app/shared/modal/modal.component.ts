import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../core/data.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap/modal/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  private el: Component;
  private data: any;
  private modalRef: NgbModalRef;
  hasModal = false;

  constructor(private modalCoreService: NgbModal, private dataService: DataService) {
  }

  ngOnInit() {
    
    this.dataService.openModal$.subscribe(
      data => {
        
        this.data = data;
        this.open();
      });
    this.dataService.closeModal$.subscribe(
      data => {
        this.close();
      });
  }

  open() {
    
    if (this.hasModal) {
      this.modalRef.dismiss();
      this.hasModal = false;
    }
    if (!this.hasModal) {
      let prop: NgbModalOptions = {
        backdrop : 'static',
        keyboard : false,
        centered: true,
        beforeDismiss: () => {
          this.hasModal = false;
          return true;
        }
      };
      prop = this.data.property ? Object.assign(prop, this.data.property) : {};
      this.modalRef = this.modalCoreService.open(this.data.el, prop);
      this.modalRef.componentInstance.data = this.data.data;
      this.modalRef.componentInstance.isPopup = true;
      this.hasModal = true;
    }
  }

  close() {
    this.modalRef.close();
  }

}
