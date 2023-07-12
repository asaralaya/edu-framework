import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  search(params:any) :Observable<any> {
    const url = ``;// Add Chat service URL here
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(url,{ params: httpParams })
  }
}
