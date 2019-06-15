import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class ServiceClient<T> {

  constructor(protected httpClient: HttpClient, private baseUrl: string) {

  }

  private static validateEndPoint(endPoint: string) {
    if (endPoint.trim() === '') {
      throw new HttpErrorResponse({'error': 'End point cannot be empty', 'status': 404, 'statusText': 'Not Found'});
    }
  }

  public get(endPoint: string): Observable<T[]> {
    ServiceClient.validateEndPoint(endPoint);
    return this.httpClient.get(`${this.baseUrl}/${endPoint}`)
      .pipe(map(response => (response as T[])));
  }

  public getJsonp(endPoint: string): Observable<T[]> {
    ServiceClient.validateEndPoint(endPoint);
    return this.httpClient.jsonp(`${this.baseUrl}/${endPoint}&jsoncallback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
      .pipe(map(response => (response['items'] as T[])));
  }


  public post(endPoint: string, postData: any): Observable<T> {
    ServiceClient.validateEndPoint(endPoint);
    return this.httpClient.post(`${this.baseUrl}/${endPoint}`, postData).pipe(map(response => (response as T)));
  }

  public delete(endPoint: string, id: number, peopleId: number): Observable<any> {
    ServiceClient.validateEndPoint(endPoint);
    return this.httpClient.delete(`${this.baseUrl}/${endPoint}?id=${id}&peopleId=${peopleId}`).pipe();
  }

}
