import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TripService } from '../../core/services/trip';
import { Trip } from '../../core/models/trip';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './trip-detail.html',
  styleUrl: './trip-detail.scss',
})
export class TripDetail implements OnInit, OnDestroy {
  trip$ = new BehaviorSubject<Trip | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTrip(id);
    }
  }

  loadTrip(id: string) {
    this.loading$.next(true);
    const sub = this.tripService.getTripById(id).subscribe({
      next: (data) => {
        this.trip$.next(data);
        this.loading$.next(false);
      },
      error: () => {
        this.loading$.next(false);
      }
    });
    this.subscription.add(sub);
  }

  // goBack() {
  //   this.router.navigate(['/']);
  // }

  ngOnDestroy() {
 this.subscription.unsubscribe();
  }
}