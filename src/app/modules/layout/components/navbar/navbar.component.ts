import { Component } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private menuService: MenuService) {}

  public toggleSidebar(): void {
    this.menuService.toggleSidebar();
  }
}
