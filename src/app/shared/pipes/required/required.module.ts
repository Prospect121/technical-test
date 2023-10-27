import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequiredPipe } from './required.pipe';



@NgModule({
  declarations: [RequiredPipe],
  imports: [
    CommonModule
  ],
  exports: [
    RequiredPipe
  ]
})
export class RequiredModule { }
