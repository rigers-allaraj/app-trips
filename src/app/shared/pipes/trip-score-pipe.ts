import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../../core/models/trip';

type ScoreTier = 'average' | 'good' | 'awesome';

@Pipe({
  name: 'tripScore',
})
export class TripScorePipe implements PipeTransform {
  transform(trip: Trip): ScoreTier {
    const score = trip.rating - (trip.co2 / 200);
    
    if (score >= 4) return 'awesome';
    if (score >= 2.5) return 'good';
    return 'average';
  }

}
