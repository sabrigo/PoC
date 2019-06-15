import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {configureTestSuite} from 'ng-bullet';
import {Router} from '@angular/router';
import {LocalStorageService} from '../local-storage-service';
import {FormsModule} from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let localStorageService: LocalStorageService;
  let router: Router;

  configureTestSuite(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', ['store', 'retrieve', 'remove']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: LocalStorageService, useValue: localStorageService},
        {provide: Router, useValue: router}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
