import {Injectable, OnDestroy} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Observable, Subject, Subscription, throwError} from 'rxjs';

export enum AlertTypes {
  None = 'none',
  Info = 'info',
  Warning = 'warning',
  Error = 'danger',
  Success = 'success'
}

@Injectable({
  'providedIn': 'root'
})
export class AlertService implements OnDestroy {
  get alertType(): AlertTypes {
    return this._alertType;
  }
  get alertMessage(): string {
    return this._alertMessage;
  }

  private _alertMessage: string;
  private _alertType: AlertTypes;
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  private readonly navigationSubscription: Subscription;

  constructor(router: Router) {
    // http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial#alert-component-ts
    // clear alert message on route change
    this.navigationSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next({'type': AlertTypes.None, 'text': ''});
        }
      }
    });
  }

  public setAlert(type: AlertTypes, message: string = '', err: any = null, keepAfterNavigationChange: boolean = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    if (type === AlertTypes.None) {
      this._setAlert(type, '');
      return;
    }
    if (type === AlertTypes.Error) {
      this._setError(err, message);
      this._setAlert(type, this._alertMessage);
      return;
    }
    this._setAlert(type, message);
  }

  private _setAlert(type: AlertTypes, message: string) {
    this._alertType = type;
    this._alertMessage = message;
    this.subject.next({'type': this._alertType, 'text': this._alertMessage});
  }

  public getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  private _setError(err?: any, message?: string) {
    this._alertType = AlertTypes.Error;
    if (message && message !== '') {
      this._alertMessage = message;
      return;
    }
    this._alertMessage = err.message;
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription != null) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
