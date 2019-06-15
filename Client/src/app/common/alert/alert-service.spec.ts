import {inject, TestBed} from '@angular/core/testing';
import {Event, NavigationStart, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AlertService, AlertTypes} from './alert-service';
import {configureTestSuite} from 'ng-bullet';

class MockRouter {
  readonly events: Observable<Event> = of(new NavigationStart(1, 'some url', 'imperative'));
}

describe('alert service', () => {

  let alertService: AlertService;
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useClass: MockRouter},
      ]
    });
  });

  it('should set alert when passed with the alert information', inject([Router], (router: Router) => {
    alertService = new AlertService(router);
    const message = 'some info alert';

    alertService.setAlert(AlertTypes.Info, message);

    expect(alertService.alertMessage).toBe(message);
    expect(alertService.alertType).toBe(AlertTypes.Info);
  }));

  it('should set alert to none', inject([Router], (router: Router) => {
    alertService = new AlertService(router);
    const message = 'no alert';

    alertService.setAlert(AlertTypes.None, message);

    expect(alertService.alertMessage).toBe('');
    expect(alertService.alertType).toBe(AlertTypes.None);
  }));

  it('should set error alert when passed with the error and custom message', inject([Router], (router: Router) => {
    alertService = new AlertService(router);
    const message = 'some error alert';

    alertService.setAlert(AlertTypes.Error, message);

    expect(alertService.alertMessage).toBe(message);
    expect(alertService.alertType).toBe(AlertTypes.Error);
  }));

  it('should set error alert when passed with the error and message', inject([Router], (router: Router) => {
    alertService = new AlertService(router);
    const err = new Error('some error thrown');

    alertService.setAlert(AlertTypes.Error, '', err);

    expect(alertService.alertMessage).toBe(err.message);
    expect(alertService.alertType).toBe(AlertTypes.Error);
  }));

  it('should get alert that was set', inject([Router], (router: Router) => {
    alertService = new AlertService(router);
    const alertType = AlertTypes.Info;
    const alertMsg = 'some information';
    const alert = {'type': alertType, 'text': alertMsg};
    alertService.setAlert(alertType, alertMsg);

    alertService.getAlert().subscribe(actualAlert => {

      expect(actualAlert.type).toBe(alert.type);
      expect(actualAlert.text).toBe(alert.text);

    });
  }));
});
