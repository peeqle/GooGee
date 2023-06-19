import {AfterContentInit, Component, ViewChild, ViewRef} from '@angular/core';
import {CommonActivity} from "../CommonActivity";
import {SearchService} from "../../../../service/user/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends CommonActivity implements AfterContentInit {
  searchBarValue: any;

  searchElements: any[] = [];

  page: any = 0;
  limit: any = 30;

  constructor(private searchService: SearchService) {
    super();
  }

  ngAfterContentInit(): void {
    this.searchService.findNearestUsers(this.limit, this.page).subscribe({
      next: (value: any[]) => {
        value.forEach((el: any) => {
          if(el != null) {
           this.searchElements.push(el);
          }
        });
      }
    })
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
