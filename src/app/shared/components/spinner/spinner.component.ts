import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'smar-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isloading$ = this.spinnerservice.isLoading$;

  constructor(private spinnerservice: SpinnerService) {}
}
