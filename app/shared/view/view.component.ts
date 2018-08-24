import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { WfConfigService } from './../../services/wf-config.service';
import { DefineWfService } from '../../services/define-wf.service';
import { RoutingStateService } from './../../services/routing-state.service'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [ RoutingStateService, WfConfigService, DefineWfService ]
})
export class ViewComponent implements OnInit {

	code : string;
	details : any = [];
	moduleName : any;
	previousRoute: string;
	columns: any = [];


    rows: any = [];
    rowsRendered: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private wfconfigservice: WfConfigService, private definewfservice: DefineWfService, private routingState: RoutingStateService) { }

ngOnInit() {
  	this.activatedRoute.params.subscribe(params => {
      this.code = params['code'];
      this.moduleName = params['modulename'];
    });

    let parameters: FormData  =  new  FormData();
	parameters.append('code',  this.code);

	switch(this.moduleName){
		case 'cult':
					this.wfconfigservice.getCultView(parameters)
							.subscribe(data => {
								if(data['basic_info']) {
									let result = data['basic_info'];
									let processDetails = result.process.length ? result.process['0']['processDisplayName'] : '-';
									const masterEntitiesArr = [];
									const userEntitiesArr = [];
									result.entity.forEach(entityRow => {
										if(entityRow.source == "CMD") {
											masterEntitiesArr.push(entityRow.entityDisplayName);
										}else{
											userEntitiesArr.push(entityRow.entityDisplayName);
										}
									});
									let mEntities = masterEntitiesArr.length ? masterEntitiesArr.concat() : "-";
									let uEntities = userEntitiesArr.length ? userEntitiesArr.concat() : "-";

									//this.details.push({'key':'Cult Code', 'value':result.code});
									this.details.push({'key':'Table Name', 'value':result.name});
									this.details.push({'key':'Process', 'value': processDetails});
									this.details.push({'key':'Master Entities', 'value': mEntities});
									this.details.push({'key':'User Entities', 'value': uEntities});
									this.details.push({'key':'Description', 'value':result.description});

									this.columns =[{
										name: 'Sr no',
										prop: 'number'
									},
									{
										name: 'User',
										prop: 'user'
									},
									{
										name: 'Role',
										prop: 'role'
									},
									{
										name: 'Designation',
										prop: 'designation'
									},
									{
										name: 'Reporting Manager',
										prop: 'reportingManager'
									}];
									//defining rows
									for(var i = 0; i < data['approval_rules'].length ;i++)
									{
										var rowObject = {};
										rowObject['number'] = i + 1;

										rowObject['user'] = data["approval_rules"][i]["emailId"];
										rowObject['role'] = data["approval_rules"][i]["role"];
										rowObject['designation'] = data["approval_rules"][i]["designatation"];
										rowObject['reportingManager'] = data["approval_rules"][i]["reportingManager"];

										this.rows.push(rowObject);
									}
									this.rowsRendered = true;
								}
							},
							error => {

							}
					);
					break;
		case 'wcm':
					this.wfconfigservice.getWCMView(parameters)
						.subscribe(data => {
							if(data['result'].length) {
								let result = data['result']['0'];
								this.details.push({'key':'WCM Id', 'value':result.wcmId});
								this.details.push({'key':'WCM Code', 'value':result.code});
								let processDetails = result.process.length ? result.process['0']['processDisplayName'] : '-';
								this.details.push({'key':'Process', 'value': processDetails});
								this.details.push({'key':'Description', 'value':result.description});
								this.details.push({'key':'Condition', 'value':result.condition});
								this.rowsRendered = false;
							}
						},
						error => {

						}
					);
					break;
		case 'mcw':
					this.definewfservice.getMCWView(parameters)
						.subscribe(data => {
							if(data['result'].length) {
								let result = data['result']['0'];
								this.details.push({'key':'WCM Id', 'value':result.wcmId});
								this.details.push({'key':'WCM Code', 'value':result.code});
								let processDetails = result.process.length ? result.process['0']['processDisplayName'] : '-';
								this.details.push({'key':'Process', 'value': processDetails});
								this.details.push({'key':'Description', 'value':result.description});
								this.details.push({'key':'Condition', 'value':result.condition});
								this.rowsRendered = false;
							}
						},
						error => {
						}
					);
					break;
	}
}

  backToListing()
  {
  	//would be used when multiple views are added
  	//this.previousRoute = this.routingState.getPreviousUrl();
  	this.router.navigate(['/workflowconfiguration/cult']);
  }
}
