import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuComponent } from './sidebar-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from '../../../services/menu/menu.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidebarMenuComponent', () => {
  let component: SidebarMenuComponent;
  let fixture: ComponentFixture<SidebarMenuComponent>;
  let menuService: MenuService;

  beforeEach(async () => {
    const overlayContainerServiceSpyObj = jasmine.createSpyObj('ZbOverlayContainerService', ['getUser']);

    overlayContainerServiceSpyObj.getUser.and.returnValue({ name: 'erick' });

    await TestBed.configureTestingModule({
      declarations: [SidebarMenuComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        OverlayModule,
        AngularSvgIconModule.forRoot(),
      ],
      providers: [MenuService],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarMenuComponent);
    component = fixture.componentInstance;
    menuService = TestBed.inject(MenuService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleSidebar() of menuService', () => {
    spyOn(menuService, 'toggleSidebar');
    component.toggleSidebar();
    expect(menuService.toggleSidebar).toHaveBeenCalled();
  });

  it('should not call toggleSidebar() if isMobile is false', () => {
    spyOn(menuService, 'toggleSidebar');
    component.isMobile = false;
    component.mobileToggle();
    expect(menuService.toggleSidebar).not.toHaveBeenCalled();
  });
});
