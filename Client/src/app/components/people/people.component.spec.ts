import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PeopleComponent} from './people.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbAlertModule, NgbTabsetModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';
import {routing} from '../../../app.routing';
import {FavouritesComponent} from '../favourites/favourites.component';
import {AlertService, AlertTypes} from '../../common/alert/alert-service';
import {AlertComponent} from '../../common/alert/alert.component';
import {configureTestSuite} from 'ng-bullet';
import {of, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseSpecPage} from '../../common/base-spec-page';
import {LocalStorageService} from '../../common/local-storage-service';
import {PeopleService} from '../../../service-clients/people/people.service';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let page: BaseSpecPage<PeopleComponent>;
  let localStorageService: LocalStorageService;
  let router: Router;
  let peopleService: PeopleService;
  let alertService: AlertService;

  const mockActivatedRoute = {
    snapshot: {data: {}, queryParams: {}} as ActivatedRoute
  };

  configureTestSuite(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', ['store', 'retrieve', 'remove']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    alertService = jasmine.createSpyObj('AlertService', ['setAlert']);
    peopleService = jasmine.createSpyObj('PeopleService', ['login']);
    TestBed.configureTestingModule({
      declarations: [
        PeopleComponent, FavouritesComponent, AlertComponent],
      imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        NgbAlertModule,
        NgbTabsetModule,
        NgbTypeaheadModule,
        HttpClientTestingModule,
        routing
      ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: AlertService, useValue: alertService},
        {provide: LocalStorageService, useValue: localStorageService},
        {provide: PeopleService, useValue: peopleService},
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: Router, useValue: router},
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    page = new BaseSpecPage<PeopleComponent>(fixture);
    page.detectChanges();
  });

  describe('load', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have a text box to enter the login name', async () => {
      await page.whenStable();
      expect(page.getElement('#username')).toBeTruthy();
    });

    it('should have a button to send the login information', async () => {
      await page.whenStable();
      expect(page.getElement('#btnLogin')).toBeTruthy();
    });
  });

  describe('onSubmit', () => {
    it('should show message \'Login Name is required\' up on login validation fail when button clicked without entering login name ',
      async () => {
        await page.whenStable();

        page.click('#btnLogin');
        page.detectChanges();

        expect(page.getText('#loginNameRequiredMsg')).toBe('Login Name is required');
      });

    it('should be able to login, when login name is entered and login button is clicked',
      async () => {
        await page.whenStable();
        (<jasmine.Spy>localStorageService.store).and.callThrough();
        (<jasmine.Spy>peopleService.login).and.returnValue(of({'id': '1', 'name': 'abc', 'favourites': []}));
        await page.setValue('#username', 'abc');

        page.click('#btnLogin');
        page.detectChanges();

        expect(component.loading).toBe(true);
        expect(component.submitted).toBe(true);
        expect(page.isElementDisabled('#btnLogin')).toBe(true);
        expect(page.isElementAvailable('#loginNameRequiredMsg')).toBeFalsy();
        expect(page.isElementAvailable('.loader')).toBeTruthy();
        expect(await router.navigate).toHaveBeenCalledWith(['/']);
        expect(peopleService.login).toHaveBeenCalledTimes(1);
        expect(localStorageService.store).toHaveBeenCalledTimes(1);

      });

    it('should show authentication error, when invalid login name is entered and login button is clicked',
      (async () => {
        await page.whenStable();
        const httpErrorResponse = new HttpErrorResponse({error: new Error('Unauthorised'), status: 401, statusText: 'Unauthorised'});
        (<jasmine.Spy>localStorageService.store).and.callThrough();
        (<jasmine.Spy>peopleService.login).and.callFake(() => throwError(httpErrorResponse));
        await page.setValue('#username', 'abc');

        await page.click('#btnLogin');
        await page.detectChanges();

        expect(alertService.setAlert).toHaveBeenCalledWith(AlertTypes.Error, 'Invalid login name, please try again with correct one.');
      }));

    it('should show generic error message upon other issue, when login name is entered and login button is clicked',
      (async () => {
        await page.whenStable();
        const httpErrorResponse = new HttpErrorResponse({
          error: new Error('Internal server error'),
          status: 500,
          statusText: 'Internal server error'
        });
        (<jasmine.Spy>localStorageService.store).and.callThrough();
        (<jasmine.Spy>peopleService.login).and.callFake(() => throwError(httpErrorResponse));
        await page.setValue('#username', 'abc');

        await page.click('#btnLogin');
        await page.detectChanges();

        expect(alertService.setAlert).toHaveBeenCalledWith(AlertTypes.Error, 'Something weird happened, unable to log you in now.  ' +
          'Please try later.', httpErrorResponse);
      }));
  });

});
