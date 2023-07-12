import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  approvalListSubject: BehaviorSubject<any> = new BehaviorSubject([]);

  getUpdateList() {
    return this.approvalListSubject.asObservable()
  }
}
