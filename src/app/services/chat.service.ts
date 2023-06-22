import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  search(params:any) :Observable<any> {
    // Perform the search based on the input query
    const url = `http://20.219.197.218:8000/query-with-langchain-gpt4`;
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(url,{ params: httpParams })
    // Add your search logic here
  }
}
