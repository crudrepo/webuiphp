import {  Component, OnInit, ElementRef, AfterViewInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  gobackto:string;
  breadcrumb: Array<any>;
  pageHeading: string;
  navigation:Array<any>;
  navTabs: boolean;
  showBackbutton:boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
   
  }

  ngOnInit() {
     this.router.events
    .filter(e => e instanceof NavigationEnd)
    .forEach(e => {
      
      this.showBackbutton = this.activatedRoute.root.firstChild.snapshot.data['showBackbutton'] ? this.activatedRoute.root.firstChild.snapshot.data['showBackbutton'] : '';
      this.gobackto = this.activatedRoute.root.firstChild.snapshot.data['gobackto'] ? this.activatedRoute.root.firstChild.snapshot.data['gobackto'] : '';
      this.breadcrumb = this.activatedRoute.root.firstChild.snapshot.data['breadcrumb'] ? this.activatedRoute.root.firstChild.snapshot.data['breadcrumb'] : '';
      this.pageHeading = this.activatedRoute.root.firstChild.snapshot.data['pageHeading'] ? this.activatedRoute.root.firstChild.snapshot.data['pageHeading'] : '';
      this.navTabs = this.activatedRoute.root.firstChild.snapshot.data['navTabs'] ? this.activatedRoute.root.firstChild.snapshot.data['navTabs'] : '';
      this.navigation = this.activatedRoute.root.firstChild.snapshot.data['navigation'] ? this.activatedRoute.root.firstChild.snapshot.data['navigation'] : '';
    });

  }


}
