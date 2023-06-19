import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ServerService} from "../system/server.service";
import {ServerLinks} from "../resource/ServerLinks.enum";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient,
              private server: ServerService) {
  }

  searchForQuery(query: any, limit: any, page: any): any {
    if (!query) {
      return;
    }
    return this.http.get(this.server.prepareServerLink(ServerLinks.SEARCH_FOR_QUERY),  {
      params: new HttpParams()
        .set("offset", page)
        .set("limit", limit)
        .set("query", query),
      headers: this.server.generateRequiredHeaders()
    })
  }

  findNearestUsers(limit: any, page: any) {
    return this.http.get(this.server.prepareServerLink(ServerLinks.SEARCH_FOR_NEAREST_USERS),  {
      params: new HttpParams()
        .set("offset", page)
        .set("limit", limit),
      headers: this.server.generateRequiredHeaders()
    })
  }

  addElement(element: any) {
    return this.http.post(this.server.prepareServerLink(ServerLinks.SEARCH_ADD_ELEMENT), {}, {
      params: new HttpParams()
        .set("type", element.type)
        .set("id", element.id),
      headers: this.server.generateRequiredHeaders()
    })
  }
}
