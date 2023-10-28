import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarMenuComponent } from './components/sidebar/sidebar-menu/sidebar-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [LayoutComponent, NavbarComponent, SidebarComponent, SidebarMenuComponent, FooterComponent],
  imports: [CommonModule, LayoutRoutingModule, AngularSvgIconModule.forRoot(), TranslateModule],
})
export class LayoutModule {}
