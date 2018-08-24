import { Component, OnInit, Input ,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-classic-header',
  templateUrl: './classic-header.component.html',
  styleUrls: ['./classic-header.component.scss']
})
export class ClassicHeaderComponent implements OnInit {

  @Input()
  user: any;

  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }
  ngAfterViewInit()
  {
    console.log(this.user);
  }

  logout() {
    window.location.href = '/rulesmanager/user/default/logout';
  }

}
