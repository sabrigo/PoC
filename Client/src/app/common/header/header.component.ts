import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HeaderService} from './header-service';
import {Subscription} from 'rxjs';
import {People} from '../../models/people';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  public isLoggedIn: boolean;

  constructor(private headerService: HeaderService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.headerService.getPeople()
      .subscribe((people: People) => {
        this.isLoggedIn = people !== null && people !== undefined;
      });
  }

  public logout() {
    this.headerService.removePeople();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }
}
