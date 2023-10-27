import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleListComponent } from './containers/sale-list/sale-list.component';
import { SaleFormComponent } from './containers/sale-form/sale-form.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormControlModule } from 'src/app/shared/pipes/form-control/form-control.module';
import { RequiredModule } from 'src/app/shared/pipes/required/required.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputErrorModule } from 'src/app/shared/directives/input-error/input-error.module';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  {
    path: '',
    component: SaleListComponent,
  },
];

@NgModule({
  declarations: [SaleListComponent, SaleFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FormControlModule,
    RequiredModule,
    ReactiveFormsModule,
    InputErrorModule,
    MatRadioModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class SaleModule {}
