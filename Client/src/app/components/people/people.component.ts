import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PeopleService} from '../../../service-clients/people/people.service';
import {AlertService, AlertTypes} from '../../common/alert/alert-service';
import {HeaderService} from '../../common/header/header-service';

@Component({templateUrl: './people.component.html'})
export class PeopleComponent implements OnInit {
  get submitted(): boolean {
    return this._submitted;
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  get loading(): boolean {
    return this._loading;
  }

  private _loginForm: FormGroup;
  private _loading = false;
  private _submitted = false;
  private returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private peopleService: PeopleService,
              private alertService: AlertService,
              private headerService: HeaderService) {
  }

  ngOnInit() {
    this._loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get loginFormControls() {
    return this._loginForm.controls;
  }

  async onSubmit() {
    this._submitted = true;
    if (this._loginForm.invalid) {
      return;
    }
    this._loading = true;
    try {
      const people = await this.peopleService.login(this.loginFormControls.username.value).toPromise();
      this.headerService.setPeople(people);
      await this.router.navigate([this.returnUrl]);
    } catch (error) {
      if (error.status === 401) {
        this.alertService.setAlert(AlertTypes.Error, 'Invalid login name, please try again with correct one.');
      } else {
        this.alertService.setAlert(AlertTypes.Error, 'Something weird happened, unable to log you in now.  Please try later.', error);
      }
      this._loading = false;
    }
  }
}
