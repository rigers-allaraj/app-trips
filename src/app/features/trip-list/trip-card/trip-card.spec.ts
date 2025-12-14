import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripCard } from './trip-card';
import { Trip } from '../../../core/models/trip';

describe('TripCard', () => {
  let component: TripCard;
  let fixture: ComponentFixture<TripCard>;

  const mockTrip: Trip = {
    id: '1',
    title: 'Test Trip',
    description: 'Test Description',
    price: 1000,
    rating: 4.5,
    nrOfRatings: 100,
    verticalType: 'flight',
    tags: ['test'],
    co2: 100,
    thumbnailUrl: 'https://example.com/thumb.jpg',
    imageUrl: 'https://example.com/image.jpg',
    creationDate: '2024-01-01'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCard]
    }).compileComponents();

    fixture = TestBed.createComponent(TripCard);
    component = fixture.componentInstance;
    component.trip = mockTrip;  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display trip title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Test Trip');
  });
});