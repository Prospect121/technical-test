import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'report-covid',
        pathMatch: 'full',
      },
      {
        path: 'sale',
        loadChildren: () => import('../pages/sale/sale.module').then((m) => m.SaleModule),
      },
      {
        path: 'report-covid',
        loadChildren: () => import('../pages/report-covid/report-covid.module').then((m) => m.ReportCovidModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
