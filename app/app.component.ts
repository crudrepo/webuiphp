import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './core/data.service';
import { AppService } from './core/app.service';
import * as g from './core/global';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { strictEqual } from 'assert';
import { WfConfigService } from './services//wf-config.service';

import { CommonService } from './services//common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[WfConfigService,CommonService]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  appLoader = true;
  userDetails = g.USER.data;
  backUrl: any;
  productData: any;
  queryParams: any;

  constructor(private dataService: DataService, private service: AppService, private activatedRoute: ActivatedRoute, private elementRef: ElementRef, private sanitizer: DomSanitizer, private translate: TranslateService) {

  }

  ngOnInit(): void {
  
    this.translate.setDefaultLang('en');

    this.fetchUser();
    this.activatedRoute.queryParams
    .switchMap((params: Params) => {
      if(params.product_id && params.product_id) {
        this.queryParams = Object.assign({}, params);
      }
      return Observable.empty();
    })
    .subscribe((res: any) => {});
    this.dataService.errorThrown$.subscribe(e => {
      if (e) {
        /* this.appLoader = false; */
      }
    });

    Observable.interval(1000 * 60 * 15) /* getting user details every 15 min from session */
    .subscribe(() => {
      this.fetchUser()
    });
  }

  ngAfterViewInit() {
    this.dataService.userSet$
    .subscribe(() => {
      this.setRainbowHeader();
    });
    this.setRainbowHeader();
  }

  setRainbowHeader() {
    //this.userDetails = {"userId":"82c74a25-f57a-4722-8756-02e4a2592cba","tmsTokenId":"e94fd1e0-d616-44eb-a219-8ae9bc9d126c","userName":"Poorva","productData":false,"emailAddress":"poorva.zspdev%40zycus.com","allocatedProducts":[{"id":"1098b6b2-8718-4208-9c48-14e73b78d99e","name":"SIM","active":true},{"id":"44ff7504-cf6c-45ef-a8f4-a5ae7b7acca3","name":"eInvoice","active":true},{"id":"fcb42a73-00cd-4aac-9380-b75d0296641d","name":"Import Studio","active":true},{"id":"51e3b856-922f-4a92-87ee-e2d8dd6e3e0c","name":"Field Library","active":true},{"id":"f6607665-1644-4215-acb6-95281695528f","name":"workflow_test_product","active":true},{"id":"fe74188a-1106-4d35-87d6-392767dae56a","name":"Dynamic Discounting","active":true},{"id":"6572a7a4-3a91-4a68-a385-5052a27479db","name":"eProc","active":true},{"id":"1999d9f5-b972-4cdd-bfe3-49eb9b438afc","name":"iSource","active":true},{"id":"60df86cd-e2da-45b8-97b7-623d786d37ff","name":"TMS","active":true},{"id":"85e3461c-6730-40a4-b649-d9c38236c33a","name":"iConsole","active":true},{"id":"9d776f98-b0a4-4aab-baa8-6aafc6a9ecc5","name":"FlexiForm Studio","active":true}],"tenantLogo":"http:\/\/ziplsy1913.zycus.net:90\/workflow\/html\/images\/tenant-logo\/def68304-7e50-463c-95f5-7af9dcb4e600.png","rainbow_url":"https:\/\/rb3.zycus.net","rainbow_header_url":"https:\/\/rb3.zycus.net\/ZycusCommonHeader\/COMMON_HEADER.do","userProfile":{"preference":{"company":{"timeZone":"IST","language":"en_US","dateFormat":"dd\/MM\/yyyy","timeFormat":"24 Hours","dateTimeFormat":"dd\/MM\/yyyy","numberFormat":"#,###,###","precision":0,"currency":"INR"},"policy":{"sessionTimeout":1800000},"timeZone":"Asia\/Calcutta","timeOffset":19800000,"language":"english","dateFormat":"d\/m\/Y","dateTimeFormat":"d\/m\/Y H:i:s","numberFormat":"##,###.##","precision":2,"currency":"AED","tms":{"timeZone":"IST","language":"en_US","dateFormat":"dd\/MM\/yyyy","dateTimeFormat":"dd\/MM\/yyyy","timeFormat":"24 Hours","numberFormat":"#,###,###.##","precision":2,"currency":"AED"},"js":{"timeZone":"Asia\/Calcutta","language":"english","dateFormat":"dd\/mm\/yy","dateTimeFormat":"dd\/mm\/yy H:i:s","numberFormat":"##,###.##","precision":2,"currency":"AED"}},"isCompanyAdmin":true,"isZycusAdmin":false,"allocatedProducts":["SIM","EINVOICE","IMPORT STUDIO","FIELD LIBRARY","WORKFLOW_TEST_PRODUCT","DYNAMIC DISCOUNTING","EPROC","ISOURCE","TMS","ICONSOLE","FLEXIFORM STUDIO"],"allocatedProductsArr":[{"id":"1098b6b2-8718-4208-9c48-14e73b78d99e","name":"SIM","active":true},{"id":"44ff7504-cf6c-45ef-a8f4-a5ae7b7acca3","name":"eInvoice","active":true},{"id":"fcb42a73-00cd-4aac-9380-b75d0296641d","name":"Import Studio","active":true},{"id":"51e3b856-922f-4a92-87ee-e2d8dd6e3e0c","name":"Field Library","active":true},{"id":"f6607665-1644-4215-acb6-95281695528f","name":"workflow_test_product","active":true},{"id":"fe74188a-1106-4d35-87d6-392767dae56a","name":"Dynamic Discounting","active":true},{"id":"6572a7a4-3a91-4a68-a385-5052a27479db","name":"eProc","active":true},{"id":"1999d9f5-b972-4cdd-bfe3-49eb9b438afc","name":"iSource","active":true},{"id":"60df86cd-e2da-45b8-97b7-623d786d37ff","name":"TMS","active":true},{"id":"85e3461c-6730-40a4-b649-d9c38236c33a","name":"iConsole","active":true},{"id":"9d776f98-b0a4-4aab-baa8-6aafc6a9ecc5","name":"FlexiForm Studio","active":true}],"activities":false,"salutation":"Dr","firstName":"poorva","lastName":"zspdev","displayName":"Poorva","emailAddress":"poorva.zspdev@zycus.com","companyId":"def68304-7e50-463c-95f5-7af9dcb4e600","companyName":"ZSPDEV1","userId":"82c74a25-f57a-4722-8756-02e4a2592cba","isFirstTimeLogin":"false","tokenId":"","defaults":{"todayDate":"20\/04\/2018","todayDateTimeStamp":"1524182400000","todayUTCDateTimeStamp":"1524162600000"},"isRainbowOn":true,"rainbowUrl":"https:\/\/rb3.zycus.net"},"UserProfilelink":"https:\/\/smttenants.zycus.net\/tms\/public\/user\/userProfile.tms","tmsHomePage":"https:\/\/smttenants.zycus.net\/tms\/user\/homepage.tms","adrumAppJS":"","adrumAppKey":""};

    if(this.userDetails['rainbow_header_url']) {
      var code = 'var currentProduct = "Import Studio"; var tmsTokenId = "' + this.userDetails['rainbow_header_url'] + '"; var rainbowContext = {menuUniqueName: "IMPORT_STUDIO", menuDisplayname: "Import Studio", tmsProductName: "Import Studio", entityName: "", entityId: ""};';

      var step = document.createElement("script");
      step.appendChild(document.createTextNode(code))
      step.type = "text/javascript";
      this.elementRef.nativeElement.appendChild(step);

      var step = document.createElement("script");
      step.type = "text/javascript";
      step.src = this.userDetails['rainbow_header_url'];
      this.elementRef.nativeElement.appendChild(step);
    }

    if(this.userDetails['adrumAppKey'] && this.userDetails['adrumAppJS']) {
      var code = 'window["adrum-app-key"] = "'+this.userDetails['adrumAppKey']+'"; window["adrum-start-time"] ='+ new Date().getTime()+';';

      var step = document.createElement("script");
      step.appendChild(document.createTextNode(code))
      step.type = "text/javascript";
      this.elementRef.nativeElement.appendChild(step);

      var step1 = document.createElement("script");
      step1.type = "text/javascript";
      step1.src = this.userDetails['adrumAppJS'];
      this.elementRef.nativeElement.appendChild(step1);

      var code = '	ADRUM.command ("addUserData", "email_id", "'+this.userDetails['emailAddress']+'");ADRUM.command ("addUserData", "tenant_id", "'+this.userDetails['userProfile']['companyId']+'");';
      var step2 = document.createElement("script");
      step2.type = "text/javascript";
      step2.src = this.userDetails['adrumAppJS'];
      this.elementRef.nativeElement.appendChild(step2);
    }
  }

  fetchUser() {
    this.service.fetchUser()
    .subscribe(res => {
      this.appLoader = false;
      this.userDetails = Object.assign({}, res);
      this.setPreferences();
      g.USER.data = this.userDetails;

    });
  }

  setPreferences() {
    const prefs = Object.assign({}, this.userDetails['userProfile']['preference']['tms']);
    prefs['dateFormat'] =  g.dateFormat[prefs['dateFormat']] ? g.dateFormat[prefs['dateFormat']] : 'YYYY/MM/DD';
    prefs['timeFormat'] =  g.timeFormat[prefs['timeFormat']] ? g.timeFormat[prefs['timeFormat']] : 'HH:mm:ss';
    prefs['dateTimeFormat'] =  prefs['dateFormat'] + ' ' + prefs['timeFormat'];
    prefs['language'] =  g.language[prefs['language']] ? g.language[prefs['language']] : 'en';
    prefs['timeZone'] = g.timeZone[prefs['timeZone']] ? g.timeZone[prefs['timeZone']] : 'GMT' ;
    this.userDetails['userProfile']['preference']['ng'] = prefs;
    //
    this.switchLanguage(prefs['language']);
  }

  switchLanguage(language: string) {
   // this.translate.use(language);
  }
}
