import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {configureTestSuite} from 'ng-bullet';
import {BaseSpecPage} from './common/base-spec-page';
import {PeopleComponent} from './components/people/people.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routing} from '../app.routing';
import {AuthGuard} from '../auth.guard';
import {FavouritesComponent} from './components/favourites/favourites.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PeopleService} from '../service-clients/people/people.service';
import {NgbAlertModule, NgbTabsetModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {AlertComponent} from './common/alert/alert.component';
import {AlertService} from './common/alert/alert-service';
import {HeaderComponent} from './common/header/header.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let page: BaseSpecPage<AppComponent>;
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbAlertModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgbTypeaheadModule,
        NgbTabsetModule,
        FormsModule,
        routing
      ],
      declarations: [
        AppComponent,
        PeopleComponent,
        FavouritesComponent,
        AlertComponent,
        HeaderComponent
      ],
      providers: [
        AuthGuard,
        PeopleService,
        AlertService
      ]
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    page = new BaseSpecPage<AppComponent>(fixture);
    page.detectChanges();
  });
  it('should create the app', (async () => {
    await page.whenStable();
    expect(component).toBeTruthy();
  }));
  it('should render title in a h1 tag', (async () => {
    await page.whenStable();
    expect(page.getText('h1').trim()).toBe('Welcome to PoC!');
  }));
});
