import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from '../../services/menu/menu.service';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let menuService: MenuService;

  beforeEach(async () => {
    const overlayContainerServiceSpyObj = jasmine.createSpyObj('SmarOverlayContainerService', ['getUser']);

    overlayContainerServiceSpyObj.getUser.and.returnValue({ name: 'erick' });

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot(), OverlayModule],
      providers: [MenuService],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
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
});
