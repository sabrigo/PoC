import {RouterModule, Routes} from '@angular/router';
import {FavouritesComponent} from './app/components/favourites/favourites.component';
import {PeopleComponent} from './app/components/people/people.component';
import {AuthGuard} from './auth.guard';


const appRoutes: Routes = [
  {path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard]},
  {path: 'login', component: PeopleComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: 'favourites'}
];

export const routing = RouterModule.forRoot(appRoutes);
