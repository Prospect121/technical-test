import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCovidComponent } from './report-covid.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ReportCovidComponent,
  },
];

@NgModule({
  declarations: [ReportCovidComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule],
})
export class ReportCovidModule {}
