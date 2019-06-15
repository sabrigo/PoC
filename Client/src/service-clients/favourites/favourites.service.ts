import {Injectable} from '@angular/core';
import {ServiceClient} from '../service-client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Favourites} from '../../app/models/favourites';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService extends ServiceClient<Favourites> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.favouritesBaseUrl + 'api/favourites');
  }
}
