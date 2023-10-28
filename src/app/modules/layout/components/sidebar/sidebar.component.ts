import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu/menu.service';
import { MenuItem } from 'src/app/modules/layout/interfaces/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public showSideBar$: Observable<boolean> = new Observable<boolean>();
  public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();

  constructor(private menuService: MenuService) {
    this.showSideBar$ = this.menuService.showSideBar$;
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
}
