import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="loading">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [`
    .loading {
      display: flex;
      justify-content: center;
      padding: 40px;
    }
  `]
})
export class LoadingComponent {}