import { Component, Input } from '@angular/core';

import { Trip } from '../../../core/models/trip';

import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-trip-card',
    standalone: true,
  imports: [SharedModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.scss',
})
export class TripCard {
  @Input() trip!: Trip;
}