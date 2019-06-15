import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FavouritesComponent} from './components/favourites/favourites.component';
import {NgbAlertModule, NgbModule, NgbTabsetModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientJsonpModule, HttpClientModule, JsonpInterceptor} from '@angular/common/http';
import {PeopleComponent} from './components/people/people.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routing} from '../app.routing';
import {AuthGuard} from '../auth.guard';
import {AlertService} from './common/alert/alert-service';
import {AlertComponent} from './common/alert/alert.component';
import { HeaderComponent } from './common/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FavouritesComponent,
    PeopleComponent,
    AlertComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAlertModule,
    NgbTypeaheadModule,
    NgbTabsetModule,
    HttpClientModule,
    HttpClientJsonpModule,
    routing
  ],
  providers: [
    HttpClient,
    AuthGuard,
    AlertService,
    {provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
