import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AlertComponent} from './alert.component';
import {configureTestSuite} from 'ng-bullet';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from './alert-service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let router: Router;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [NgbAlertModule, RouterTestingModule],
      declarations: [AlertComponent],
      providers: [AlertService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
