import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss']
})
export class ToastMessageComponent implements OnInit {

  toastFlag = false;
  data: any;
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.openToast$.subscribe(
      data => {
        this.data = data;
        this.open();
      });
    this.dataService.closeToast$.subscribe(
      data => {
        this.close();
      });
  }

  open() {
    this.toastFlag = true;
    setTimeout(() => {
      this.close();
    }, 5000);
  }

  close() {
    this.toastFlag = false;
  }

}
