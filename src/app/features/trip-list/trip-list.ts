import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { TripService } from '../../core/services/trip';
import { Trip } from '../../core/models/trip';
import { TripCard } from './trip-card/trip-card';
import { SharedModule } from '../../shared/shared-module';
import { AppStateService } from '../../core/services/app-state';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [SharedModule, TripCard],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.scss',
})
export class TripList implements OnInit, OnDestroy {
  trips$ = new BehaviorSubject<Trip[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  sortBy = 'title';
  currentPage = 1;
  pageSize = 10;
  hasMore = true;
  private subscription = new Subscription();

  constructor(
    private tripService: TripService,
    private appState: AppStateService,
    private router: Router
  ) { }

  ngOnInit() {
    // Get the saved sort value
    this.sortBy = this.appState.getSortBy();
    this.loadTrips();
  }

  loadTrips() {
    this.loading$.next(true);
    const sub = this.tripService.getTrips(this.sortBy, 'ASC', this.currentPage, this.pageSize).subscribe({
      next: (data) => {
              // console.log('R', this.currentPage, 'items', data.length);
        const currentTrips = this.trips$.value;
        this.trips$.next([...currentTrips, ...data]);
        this.hasMore = data.length === this.pageSize;
        this.loading$.next(false);
      },
      error: () => {
        this.loading$.next(false);
      }
    });
    this.subscription.add(sub);
  }

  loadMore() {
    if (!this.hasMore || this.loading$.value) return;
    this.currentPage++;
    this.loadTrips();
  }

  onSortChange(value: string) {
    this.sortBy = value;
    this.appState.setSortBy(value);  // Save to state
        this.currentPage = 1;
    this.trips$.next([]);
    this.loadTrips();
  }

  onTripClick(tripId: string) {
    this.router.navigate(['/trip', tripId]);
  }

  goToTripOfTheDay() {

    const sub = this.tripService.getTripOfTheDay().subscribe({
      next: (trip) => {
        if (trip) {
          this.router.navigate(['/trip', trip.id]);
        }
      }
    });
    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}