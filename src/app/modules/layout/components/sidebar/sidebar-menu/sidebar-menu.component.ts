import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest, startWith } from 'rxjs';
import { MenuItem, SubMenuItem } from 'src/app/modules/layout/interfaces/menu';
import { MenuService } from 'src/app/modules/layout/services/menu/menu.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent implements OnInit {
  public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();
  public showSideBar$: Observable<boolean> = new Observable<boolean>();
  isMobile$!: Observable<BreakpointState>;
  isMobile = false;

  constructor(
    private menuService: MenuService,
    private breakpointObserver: BreakpointObserver,
    private translationService: TranslateService,
  ) {
    this.showSideBar$ = this.menuService.showSideBar$;
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  public mobileToggle() {
    if (!this.isMobile) return;
    //this.toggleSidebar();
  }

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  ngOnInit(): void {
    this.isMobile$ = this.breakpointObserver.observe(Breakpoints.Handset);
    this.isMobile$.subscribe((value) => (this.isMobile = value.matches));

    const onLangChange$ = this.translationService.onLangChange.pipe(startWith(this.translationService.currentLang));
    const sortMasterMenu$ = combineLatest([this.pagesMenu$, onLangChange$]);
    sortMasterMenu$.subscribe(([menu, langOptions]) => {
      this.sortMenuGroup(menu);
    });
  }

  sortMenuGroup(menu: MenuItem[], group = 'Masters') {
    const mastersMenuGroup = menu.find((item) => item.group === group);
    mastersMenuGroup?.items.forEach((masterMenu) => {
      this.sortMenuForText(masterMenu?.children || []);
    });
  }

  sortMenuForText(menu: any[], propertie = 'label', ascend = true) {
    menu.sort((itemA, itemB) => {
      const labelA = this.translationService.instant(itemA[propertie]).toLowerCase();
      const labelB = this.translationService.instant(itemB[propertie]).toLowerCase();

      if (!ascend) return labelA > labelB ? -1 : 1;

      return labelA > labelB ? 1 : -1;
    });

    return menu;
  }
}
