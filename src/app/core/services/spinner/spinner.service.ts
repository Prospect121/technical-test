import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  cont = 0;
  isLoading$ = new Subject<boolean>();

  show(): void {
    if (this.cont === 0) {
      this.isLoading$.next(true);
    }
    this.cont++;
  }

  hide(): void {
    this.cont--;
    if (this.cont === 0) {
      this.isLoading$.next(false);
    }
  }
}
