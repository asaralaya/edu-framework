import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { FRAMEWORK } from '../constants/data'
import { NSFramework } from '../models/framework.model';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  categoriesHash: BehaviorSubject<NSFramework.ICategory[] | []> = new BehaviorSubject<NSFramework.ICategory[] | []>([])
  isDataUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  currentSelection: BehaviorSubject<{ type: string, data: any, cardRef?: any } | null> = new BehaviorSubject<{ type: string, data: any, cardRef?: any } | null>(null)
  termSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  list = new Map<string, NSFramework.IColumnView>();
  selectionList = new Map<string, NSFramework.IColumnView>();
  insertUpdateDeleteNotifier: BehaviorSubject<{ type: 'select' | 'insert' | 'update' | 'delete', action: string, data: any }> = new BehaviorSubject<{ type: 'select' | 'insert' | 'update' | 'delete', action: string, data: any }>(null)
   frameworkId: string;

  getFrameworkInfo(): Observable<any> {
    this.resetAll();
    this.formateData(FRAMEWORK);
    return of(FRAMEWORK)
  }

  getNextCategory(currentCategory: string) {
    const currentIndex = this.categoriesHash.value.findIndex((a: NSFramework.ICategory) => {
      return a.code === currentCategory
    })
    let categoryLength = this.categoriesHash.getValue().length
    return (currentIndex + 1) <= categoryLength ? this.categoriesHash.getValue()[currentIndex + 1] : null
  }
  getPreviousCategory(currentCategory: string) {
    const currentIndex = this.categoriesHash.value.findIndex((a: NSFramework.ICategory) => {
      return a.code === currentCategory
    })
    return (currentIndex - 1) >= 0 ? this.categoriesHash.getValue()[currentIndex - 1] : null
  }

  resetAll() {
    this.categoriesHash.next([])
    this.currentSelection.next(null)
    this.list.clear()
  }


  formateData(response: any) {
    this.frameworkId = response.result.framework.code;
    (response.result.framework.categories).forEach((a, idx) => {
      this.list.set(a.code, {
        code: a.code,
        identifier: a.identifier,
        index: a.index,
        name: a.name,
        selected: a.selected,

        description: a.description,
        translations: a.translations,
        category: a.category,
        associations: a.associations,
        children: (a.terms || []).map(c => {
          const associations = c.associations || []
          if (associations.length > 0) {
            Object.assign(c, { children: associations })
          }
          return c
        })
      })
    });
    const allCategories = []
    this.list.forEach(a => {
      allCategories.push({
        code: a.code,
        identifier: a.identifier,
        index: a.index,
        name: a.name,
        description: a.description,
        translations: a.translations,
      } as NSFramework.ICategory)
    })
    this.categoriesHash.next(allCategories)
  }
}
