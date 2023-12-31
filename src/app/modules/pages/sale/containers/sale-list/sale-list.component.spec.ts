import { TestBed } from '@angular/core/testing';

import { SaleListComponent } from './sale-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SmarOverlayContainerService } from 'src/app/core/services/overlay-container/overlay-container.service';
import { MasterCrudService } from 'src/app/core/services/master-crud/master-crud.service';
import { ChangeDetectorRef } from '@angular/core';

describe('SaleListComponent', () => {
  let component: SaleListComponent;
  let smarOverlayContainerServiceSpy: jasmine.SpyObj<SmarOverlayContainerService>;
  let crudServiceSpy: jasmine.SpyObj<MasterCrudService>;
  let changeDetectorRefSpy: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(() => {
    crudServiceSpy = jasmine.createSpyObj('MasterCrudService', ['getCrudder', 'getDependency', 'getItem']);

    const smarOverlayContainerServiceSpyObj = jasmine.createSpyObj('SmarOverlayContainerService', [
      'openOverlay',
      'closeOverlay',
      'close',
    ]);

    TestBed.configureTestingModule({
      declarations: [SaleListComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), MatTableModule, MatSortModule, MatPaginatorModule],
      providers: [
        { provide: SmarOverlayContainerService, useValue: smarOverlayContainerServiceSpyObj },
        ChangeDetectorRef,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    crudServiceSpy = TestBed.inject(MasterCrudService) as jasmine.SpyObj<MasterCrudService>;
    smarOverlayContainerServiceSpy = TestBed.inject(
      SmarOverlayContainerService,
    ) as jasmine.SpyObj<SmarOverlayContainerService>;
    changeDetectorRefSpy = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;
    component = new SaleListComponent(crudServiceSpy, smarOverlayContainerServiceSpy, changeDetectorRefSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
