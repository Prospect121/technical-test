import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuService } from '../../services/menu/menu.service';
import { SidebarComponent } from './sidebar.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let menuService: MenuService;

  beforeEach(async () => {
    const overlayContainerServiceSpyObj = jasmine.createSpyObj('ZbOverlayContainerService', ['getUser']);

    overlayContainerServiceSpyObj.getUser.and.returnValue({ name: 'erick' });

    await TestBed.configureTestingModule({
      declarations: [SidebarComponent, SidebarMenuComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        OverlayModule,
        AngularSvgIconModule.forRoot(),
      ],
      providers: [MenuService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    menuService = TestBed.inject(MenuService);
    fixture.detectChanges();
  });

  it('should call toggleSidebar() of menuService', () => {
    spyOn(menuService, 'toggleSidebar');
    component.toggleSidebar();
    expect(menuService.toggleSidebar).toHaveBeenCalled();
  });
});
