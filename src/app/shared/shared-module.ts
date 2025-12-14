import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading';
import { MaterialModule } from './material-module';
import { PageContainerComponent } from './page-container/page-container';
import { TripScorePipe } from './pipes/trip-score-pipe';


@NgModule({
  imports: [CommonModule, MaterialModule, LoadingComponent,PageContainerComponent,TripScorePipe],
  exports: [CommonModule,
    MaterialModule,
    LoadingComponent,PageContainerComponent,TripScorePipe]
})
export class SharedModule { }