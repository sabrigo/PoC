import {Injectable} from '@angular/core';
import {ServiceClient} from '../service-client';
import {People} from '../../app/models/people';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends ServiceClient<People> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.peopleBaseUrl + 'api/people');
  }

  public login(loginName: string): Observable<People> {
    return this.post('login', {'name': loginName});
  }
}
