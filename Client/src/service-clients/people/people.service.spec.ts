import {TestBed} from '@angular/core/testing';
import {PeopleService} from './people.service';
import {configureTestSuite} from 'ng-bullet';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {People} from '../../app/models/people';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpMock: HttpTestingController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    service = TestBed.get(PeopleService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get logged in user when user name is passed', () => {
    service.login('abc').subscribe((r: People) => expect(r).toEqual(new People({
      id: 1,
      name: 'abc'
    })));
    const req = httpMock.expectOne({method: 'POST', url: `${environment.peopleBaseUrl}api/people/login`});
    expect(req.request.method).toBe('POST');
    req.flush(new People({id: 1, name: 'abc'}));
  });
});
