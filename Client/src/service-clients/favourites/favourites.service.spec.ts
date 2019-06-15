import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpErrorResponse} from '@angular/common/http';
import {FavouritesService} from './favourites.service';
import {environment} from '../../environments/environment';
import {Favourites} from '../../app/models/favourites';
import {configureTestSuite} from 'ng-bullet';

describe('FavouritesService', () => {
  let httpMock: HttpTestingController;
  let service: FavouritesService;
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavouritesService]
    });
  });
  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(FavouritesService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#get', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should get records from the server when the end point is given', () => {
      service.get('get?id=1').subscribe((r: Favourites[]) => expect(r).toEqual([new Favourites({
        id: 1,
        peopleId: 1,
        imageId: 1
      })]));
      const req = httpMock.expectOne({method: 'GET', url: `${environment.favouritesBaseUrl}api/favourites/get?id=1`});
      expect(req.request.method).toBe('GET');
      req.flush([new Favourites({id: 1, peopleId: 1, imageId: 1})]);
    });

    it('should throw not found http error when the end point is not given', () => {
      expect(() => service.get('')).toThrow(new HttpErrorResponse({
        'error': 'End point cannot be empty',
        'status': 404,
        'statusText': 'Not Found'
      }));
    });
  });

});
