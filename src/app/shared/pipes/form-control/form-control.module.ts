import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlPipe } from './form-control.pipe';



@NgModule({
  declarations: [
    FormControlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormControlPipe
  ]
})
export class FormControlModule { }
