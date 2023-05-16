import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }


  save(location: string, content: Object) {
    localStorage.setItem(location, btoa(JSON.stringify(content)));
  }

  fetch(location: string) {
    let item = localStorage.getItem(location);
    if (null != item) {
      return JSON.parse(atob(item));
    }
    return item;
  }

  fetchTokens() {
    return this.fetch("tokens");
  }
  removeTokens() {
    localStorage.removeItem("tokens")
  }
}
