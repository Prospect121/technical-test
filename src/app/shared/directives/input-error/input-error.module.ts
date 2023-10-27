import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorDirective } from './input-error.directive';

@NgModule({
  declarations: [InputErrorDirective],
  imports: [CommonModule],
  exports: [InputErrorDirective],
})
export class InputErrorModule {}
