import { Routes } from '@angular/router';
import { TripList } from './features/trip-list/trip-list';
import { TripDetail } from './features/trip-detail/trip-detail';

export const routes: Routes = [
    { path: '', component: TripList },
    { path: 'trip/:id', component: TripDetail },
    { path: '**', redirectTo: '' }
];