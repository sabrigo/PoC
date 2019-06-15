import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalStorageService {


  constructor() {
  }

  store(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  retrieve(key: string): string {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
