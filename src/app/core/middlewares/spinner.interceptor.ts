import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class spinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerservice: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerservice.show();
    return next.handle(req).pipe(finalize(() => this.spinnerservice.hide()));
  }
}
