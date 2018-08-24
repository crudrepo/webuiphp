import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-classic-sub-header',
  templateUrl: './classic-sub-header.component.html',
  styleUrls: ['./classic-sub-header.component.scss']
})
export class ClassicSubHeaderComponent implements OnInit {

  @Input()
  user: any;

  constructor() { }

  ngOnInit() {
  }

}
