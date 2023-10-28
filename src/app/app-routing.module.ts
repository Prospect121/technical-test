import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterChildGuard } from './core/guards/master-child.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    canActivateChild: [MasterChildGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
