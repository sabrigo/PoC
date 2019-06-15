import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService, AlertTypes} from './alert-service';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
  get alertType(): AlertTypes {
    return this._alertType;
  }

  get alertMessage(): string {
    return this._alertMessage;
  }

  private _alertMessage: string;
  protected alertTypes: typeof AlertTypes = AlertTypes;
  private _alertType: AlertTypes;
  private subscription: Subscription;

  constructor(protected alertService: AlertService, private alertConfig: NgbAlertConfig) {

  }

  ngOnInit(): void {
    this.alertConfig.dismissible = false;
    this.subscription = this.alertService.getAlert().subscribe(alert => {
      this._alertMessage = alert.type !== AlertTypes.None && alert.text ? alert.text.trim() : '';
      this._alertType = alert.type;
    });
  }

  ngOnDestroy() {
    if (this.subscription !== null || this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
