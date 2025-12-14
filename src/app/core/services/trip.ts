import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { Trip } from '../models/trip';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = environment.apiUrl + '/trips';

  constructor(private http: HttpClient) { }

getTrips(sortBy?: string, sortOrder?: string, page: number = 1, limit: number = 10): Observable<Trip[]> {
  let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    if (sortBy) params = params.set('sortBy', sortBy);
    if (sortOrder) params = params.set('sortOrder', sortOrder);

    // return this.http.get<Trip[]>(this.apiUrl, { params });
    return this.http.get<any>(this.apiUrl, { params }).pipe(map(response => response.items), catchError(() => {
      console.error('Error loading trips');
      return of([]); // Return empty array on error
    }));
  }

  getTripById(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        console.error('Error loading trip');
        return of(null as any);
      })
    );;
  }

  getTripOfTheDay(): Observable<Trip | null> {
    const today = new Date().toDateString();
    const cached = localStorage.getItem('tripOfTheDay');
    // console.log(cached, 'cached')
    if (cached) {
      const { date, trip } = JSON.parse(cached);
      if (date === today) {
        return of(trip);
      }
    }

    return this.http.get<Trip>(`${this.apiUrl}/random/trip-of-the-day`).pipe(
      tap(trip => {
        if (trip) {
          localStorage.setItem('tripOfTheDay', JSON.stringify({ date: today, trip }));
        }
      }),
      catchError(() => of(null))
    );

  }
}