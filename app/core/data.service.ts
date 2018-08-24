import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private _user:any = {};
  public set user(data) {
    let obj = Object.assign({}, this._user);
    this._user = Object.assign({}, data);
    if(JSON.stringify(obj) != JSON.stringify(data)) {
      this.userSet.next();
    }
  };

  public get user() {
    return this._user;
  }
  private openModal = new Subject<any>();
  private closeModal = new Subject();

  openModal$ = this.openModal.asObservable();
  closeModal$ = this.closeModal.asObservable();

  private openToast = new Subject<any>();
  private closeToast = new Subject();

  openToast$ = this.openToast.asObservable();
  closeToast$ = this.closeToast.asObservable();

  public isError = new Subject<boolean>();
  errorThrown$ = this.isError.asObservable();

  private userSet = new Subject();
  userSet$ = this.userSet.asObservable();

  private confirmCancel = new Subject<any>();
  confirmCancel$ = this.confirmCancel.asObservable();

  constructor() { }

  showPopup(data: any, el: Function, prop: {} = {}) {
     this.openModal.next({data: data, el: el, property: prop});
  }

  closePopup() {
      this.closeModal.next();
  }

  showToast(msg: string = 'Success', title: string = 'Success', classTxt: string = 'success') {
    this.openToast.next({message: msg, title: title, classTxt: classTxt});
  }

  cancelJob(data) {
    this.confirmCancel.next(data);
  }

  dismissToast() {
    this.closeToast.next();
  }

}
