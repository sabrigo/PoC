import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';
import {ServiceClient} from '../service-client';
import {Flicker} from '../../app/models/flicker';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class FlickerService extends ServiceClient<Flicker> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.flickerSearchUrl);
  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.getJsonp(`photos_public.gne?format=json&tags=${term}`);
  }
}
