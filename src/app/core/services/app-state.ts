import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private sortBySubject = new BehaviorSubject<string>('title');
  sortBy$ = this.sortBySubject.asObservable();

  setSortBy(sortBy: string) {
    this.sortBySubject.next(sortBy);
  }

  getSortBy(): string {
    return this.sortBySubject.value;
  }
}