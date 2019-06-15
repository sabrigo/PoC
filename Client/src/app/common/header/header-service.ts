import {Injectable, OnInit} from '@angular/core';
import {People} from '../../models/people';
import {LocalStorageService} from '../local-storage-service';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private subject = new Subject<any>();

  constructor(private localStorageService: LocalStorageService) {

  }

  public getPeople(): Observable<any> {
    this.localStorageService.retrieve('people');
    return this.subject.asObservable();
  }

  public setPeople(people: People) {
    this.localStorageService.store('people', JSON.stringify(people));
    this.subject.next(people);
  }

  public removePeople() {
    this.localStorageService.remove('people');
    this.subject.next(null);
  }
}
