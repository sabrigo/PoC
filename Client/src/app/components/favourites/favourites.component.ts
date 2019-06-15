import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FavouritesService} from '../../../service-clients/favourites/favourites.service';
import {Favourites} from '../../models/favourites';
import {Observable, of} from 'rxjs';
import {LocalStorageService} from '../../common/local-storage-service';
import {FlickerService} from '../../../service-clients/flicker/flicker.service';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {AlertService, AlertTypes} from '../../common/alert/alert-service';
import {NgbTabChangeEvent, NgbTabset, NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {People} from '../../models/people';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
})
export class FavouritesComponent implements OnInit, OnDestroy {

  public favourites: Favourites[] = [];
  searching = false;
  searchFailed = false;
  private people: People;
  @ViewChild('tabs')
  private tabs: NgbTabset;
  formatter = (x: { title: string }) => x.title;

  constructor(private favouritesService: FavouritesService,
              private localStorageService: LocalStorageService,
              private flickerService: FlickerService,
              private alertService: AlertService
  ) {

  }

  ngOnInit() {
    this.people = this.getPeople();
    this.loadFavouritesByUser();
  }

  search = (term: Observable<string>) => {
    return term.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText) => this.flickerService.search(searchText)),
      catchError(() => {
        this.searchFailed = true;
        return of([]);
      }));
  }

  private loadFavouritesByUser() {
    this.favouritesService.get(`get?peopleId=${this.people.id}`)
      .subscribe((response: Favourites[]) => this.favourites = response);
  }

  ngOnDestroy(): void {

  }

  public async markAsFavourite(link, media) {
    const imageId = link.split('/').slice(-2)[0];
    try {
      const favourite = await this.favouritesService.post('post', {peopleId: this.people.id, imageId: imageId, image: media}).toPromise();
      this.favourites.push(favourite);
      this.alertService.setAlert(AlertTypes.Success, 'Marked as Favourite');
    } catch (error) {
      this.alertService.setAlert(AlertTypes.Error, 'Unable to mark as Favourite', error);
    }
  }

  public hasFavouriteId(link): boolean {
    return this.getFavouriteId(link) > 0;
  }

  public async removeFavourite(favId: number) {
    try {
      await this.favouritesService.delete('delete', favId, this.people.id).toPromise();
      this.favourites = this.favourites.filter(x => x.id !== favId);
      this.alertService.setAlert(AlertTypes.Success, 'Removed from Favourites');
    } catch (error) {
      this.alertService.setAlert(AlertTypes.Error, 'Unable to unmark as Favourite', error);
      return false;
    }
  }

  private getPeople() {
    return JSON.parse(this.localStorageService.retrieve('people'));
  }

  getFavouriteId(link) {
    const imageId = link.split('/').slice(-2)[0];
    const favourite = this.favourites.find(x => x.imageId === Number(imageId) && x.peopleId === Number(this.people.id));
    return favourite ? favourite.id : 0;
  }

  changeTab(event: NgbTabChangeEvent) {
    if (event.nextId === 'myFav') {
      this.loadFavouritesByUser();
    }
  }

  keepOpen($event: NgbTypeaheadSelectItemEvent) {
    $event.preventDefault();
    $event.item = null;
    this.tabs.select('myFav');
  }
}
