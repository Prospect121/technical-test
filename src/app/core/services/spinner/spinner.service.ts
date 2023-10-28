import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  cont = 0;
  isLoading$ = new Subject<boolean>();

  show(): void {
    setTimeout(() => {
      if (this.cont === 0) {
        this.isLoading$.next(true);
      }
      this.cont++;
    }, 100);
  }

  hide(): void {
    setTimeout(() => {
      this.cont--;
      if (this.cont === 0) {
        this.isLoading$.next(false);
      }
    }, 100);
  }
}
