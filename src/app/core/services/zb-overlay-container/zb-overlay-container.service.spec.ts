import { TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SmarOverlayContainerService } from './zb-overlay-container.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  template: '<div></div>',
})
class MockAppTestComponent {}

describe('SmarOverlayContainerService', () => {
  let service: SmarOverlayContainerService;
  let overlay: Overlay;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'events']);
    TestBed.configureTestingModule({
      providers: [SmarOverlayContainerService, Overlay],
    });
    service = TestBed.inject(SmarOverlayContainerService);
    overlay = TestBed.inject(Overlay);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should open overlay with component portal', () => {
    const attachSpy = jasmine.createSpy('attach');
    const componentPortal = new ComponentPortal(MockAppTestComponent);
    componentPortal.attach = () => {
      attachSpy();
      return { instance: {} } as any;
    };

    const createSpy = spyOn(overlay, 'create').and.callThrough();

    service.open(componentPortal);

    expect(createSpy).toHaveBeenCalled();
  });

  it('should close overlay if attached', () => {
    const overlayRef = jasmine.createSpyObj('OverlayRef', ['detach', 'hasAttached']);
    overlayRef.hasAttached.and.returnValue(true);
    service['_overlayRef'] = overlayRef;
    service.close();

    expect(overlayRef.detach).toHaveBeenCalled();
  });

  it('should not close overlay if not attached', () => {
    const overlayRef = jasmine.createSpyObj('OverlayRef', ['detach', 'hasAttached']);
    overlayRef.hasAttached.and.returnValue(false);
    service['_overlayRef'] = overlayRef;
    service.close();

    expect(overlayRef.detach).not.toHaveBeenCalled();
  });
  /*it('test_close_when_attached', () => {
    const overlay = jasmine.createSpyObj('Overlay', ['create']);
    const overlayRef = jasmine.createSpyObj('OverlayRef', ['detach', 'hasAttached']);
    overlayRef.hasAttached.and.returnValue(true);
    overlay.create.and.returnValue(overlayRef);

    const service = new SmarOverlayContainerService(overlay, routerSpy);
    service['_overlayRef'] = overlayRef;
    service.close();

    expect(overlayRef.detach).toHaveBeenCalled();
  });

  it('test_create_overlay_when_already_exists', () => {
    const overlay = jasmine.createSpyObj('Overlay', ['create']);
    const overlayRef = jasmine.createSpyObj('OverlayRef', ['detach', 'hasAttached']);
    overlay.create.and.returnValue(overlayRef);

    const service = new SmarOverlayContainerService(overlay, routerSpy);
    service['_overlayRef'] = overlayRef;

    const result = service['_createOverlay']();

    expect(result).toBe(overlayRef);
    expect(overlay.create).not.toHaveBeenCalled();
  });*/
});
