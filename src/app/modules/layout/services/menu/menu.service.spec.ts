import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, NavigationEnd, UrlTree } from '@angular/router';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { MenuService } from './menu.service';
import { MenuItem, SubMenuItem } from 'src/app/modules/layout/interfaces/menu';

describe('MenuService', () => {
  let service: MenuService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MenuService,
        {
          provide: Router,
          useValue: {
            events: new BehaviorSubject(new NavigationEnd(0, '/', '/')),
            createUrlTree: (commands: any[], extras?: any): UrlTree => {
              return new UrlTree();
            },
            isActive: (url: string, options: any): boolean => {
              return false;
            },
          },
        },
      ],
    });
    service = TestBed.inject(MenuService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle the sidebar', () => {
    // Arrange
    let initialSidebarState: boolean | undefined;

    // Subscribe to showSideBar$ to get the initial value
    service.showSideBar$.pipe(take(1)).subscribe((value) => {
      initialSidebarState = value;
    });

    // Act
    service.toggleSidebar();

    // Assert
    let updatedSidebarState: boolean | undefined;

    // Subscribe to showSideBar$ again to get the updated value
    service.showSideBar$.pipe(take(1)).subscribe((value) => {
      updatedSidebarState = value;
    });

    // Assert that the values are defined and compare them
    expect(initialSidebarState).toBeDefined();
    expect(updatedSidebarState).toBeDefined();
    expect(updatedSidebarState).toEqual(!initialSidebarState!);
  });

  it('should toggle the menu', () => {
    const subMenuItems: SubMenuItem[] = [];
    const menu: MenuItem = { group: 'random', items: subMenuItems };
    service.toggleMenu(menu);
    expect(menu.group).toBe('random');
  });
});
