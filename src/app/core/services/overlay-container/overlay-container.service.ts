import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class SmarOverlayContainerService {
  private _overlayRef!: OverlayRef;
  private _componentPortal!: ComponentPortal<any>;

  constructor(private _overlay: Overlay) {}

  private get _isOverlayAttached(): boolean {
    return this._overlayRef && this._overlayRef.hasAttached();
  }

  open(componentPortal: ComponentPortal<any>): any {
    this.close();
    this._componentPortal = componentPortal;
    const overlayRef = this._createOverlay();
    return overlayRef.attach(componentPortal).instance;
  }

  close() {
    if (this._isOverlayAttached) {
      this._componentPortal = null as any;
      this._overlayRef.detach();
    }
  }

  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }
    this._overlayRef = this._overlay.create(this._getOverlayConfig());
    return this._overlayRef;
  }

  private _getOverlayConfig(): OverlayConfig {
    return {
      minHeight: '90vh',
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
    };
  }
}
