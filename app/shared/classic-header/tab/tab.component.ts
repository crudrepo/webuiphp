import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  isActive: any;
  @Input()
  tabData: any;
  constructor() { }
  ngOnInit() {
  }
  active(e) {
  }
  inactive(e) {
  }
}
