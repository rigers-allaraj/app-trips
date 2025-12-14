import { TripScorePipe } from './trip-score-pipe';  
import { Trip } from '../../core/models/trip';

describe('TripScorePipe', () => {
  let pipe: TripScorePipe;

  beforeEach(() => {
    pipe = new TripScorePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "awesome" for high rating and low CO2', () => {
    const trip: Trip = {
      id: '1',
      title: 'Test Trip',
      description: 'Test',
      price: 1000,
      rating: 4.5,
      nrOfRatings: 100,
      verticalType: 'flight',
      tags: [],
      co2: 100,
      thumbnailUrl: '',
      imageUrl: '',
      creationDate: ''
    };

    expect(pipe.transform(trip)).toBe('awesome');
  });
});