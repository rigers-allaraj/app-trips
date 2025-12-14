import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDetail } from './trip-detail';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TripDetail', () => {
  let component: TripDetail;
  let fixture: ComponentFixture<TripDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TripDetail,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TripDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});