import {Component, ViewChild, ViewRef} from '@angular/core';
import {CommonActivity} from "../CommonActivity";
import {SearchService} from "../../../../service/user/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends CommonActivity {
  searchBarValue: any;

  searchElements: any[] = [];

  page: any = 0;
  limit: any = 30;

  constructor(private searchService: SearchService) {
    super();
  }

  searchForValue(event: any) {
    if (!this.searchBarValue) {
      return;
    }
    if (event.keyCode === 13) {
      this.page = 0;
      this.searchElements = [];
      this.currentValueSearch();
    }
  }

  currentValueSearch() {
    this.searchService.searchForQuery(this.searchBarValue, this.limit, this.page).subscribe({
      next: value => {
        value.forEach((el: any) => {
          return this.searchElements.push(el);
        });
      }
    })
  }

  onScroll() {
    this.page++;
    this.currentValueSearch();
  }

  addElement(element: any) {
    if (element) {
      this.searchService.addElement(element).subscribe({
        next: value => {

        }
      })
    }
  }
}
