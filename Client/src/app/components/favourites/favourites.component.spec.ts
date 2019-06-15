import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FavouritesComponent} from './favourites.component';
import {BaseSpecPage} from '../../common/base-spec-page';
import {configureTestSuite} from 'ng-bullet';
import {NgbModule, NgbTabsetModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {FavouritesService} from '../../../service-clients/favourites/favourites.service';
import {Favourites} from '../../models/favourites';
import {of} from 'rxjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlickerService} from '../../../service-clients/flicker/flicker.service';
import {AlertService} from '../../common/alert/alert-service';
import {Router} from '@angular/router';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;
  let page: BaseSpecPage<FavouritesComponent>;
  let favouritesService: FavouritesService;
  let flickerService: FlickerService;
  let alertService: AlertService;
  let router: Router;

  configureTestSuite(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    favouritesService = jasmine.createSpyObj('FavouritesService', ['get']);
    flickerService = jasmine.createSpyObj('FlickerService', ['search']);
    alertService = jasmine.createSpyObj('AlertService', ['setAlert']);
    TestBed.configureTestingModule({
      declarations: [FavouritesComponent],
      imports: [
        NgbModule,
        NgbTypeaheadModule,
        NgbTabsetModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: FavouritesService, useValue: favouritesService},
        {provide: FlickerService, useValue: flickerService},
        {provide: AlertService, useValue: alertService},
        {provide: Router, useValue: router},
      ]
    });
  });

  beforeEach(() => {
    (<jasmine.Spy>favouritesService.get).and.returnValues(of([new Favourites({id: 1, peopleId: 1, imageId: 1})]));
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    page = new BaseSpecPage<FavouritesComponent>(fixture);
    page.detectChanges();
  });

  xdescribe('load', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render accordion to display car brands and customers', async () => {
      /* await page.whenStable();
       expect(page.getElement('#accordion')).toBeTruthy();
       expect(component.favourites).toEqual([new Favourites('abc')]);*/
    });
  });

});
