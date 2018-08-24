import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  constructor(private http: HttpClientService) { }

  fetchUser(): Observable<any> {
    return this.http.get('/rulesmanager/user/default/getUserDetails');
  }

  setProductInSession(params): Observable<any> {
    return this.http.post('/api/user/default/setProduct', params);
  }
}
