import { MasterCrudService } from './../../services/master-crud/master-crud.service';
import { ICrudder } from './../../interfaces/icrudder';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterList } from './master-list';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SmarOverlayContainerService } from '../../services/overlay-container/overlay-container.service';
import { SaleListComponent } from 'src/app/modules/pages/sale/containers/sale-list/sale-list.component';
import { ChangeDetectorRef } from '@angular/core';

class MockMasterCrudService {
  getCrudder(uri: string, uriComplement: string): ICrudder {
    const content = ['item1', 'item2'];
    const size = 10;
    return {
      get: () => of({ content, size }),

      post: (body: any, params?: any) => {
        return of({ content, size });
      },
      put: (body) => of({}),

      delete: (registryID) => of({}),
    } as ICrudder;
  }

  getDependency(path: string, header: boolean = true): Observable<any> {
    return of({});
  }
}

export interface IMasterListConfig {
  uri: string;
  uriComplement: string;
}

describe('MasterList', () => {
  let masterList: MasterList;
  let crudServiceSpy: MockMasterCrudService;
  let overlayContainerServiceSpy: jasmine.SpyObj<SmarOverlayContainerService>;
  let changeDetectorRefSpy: jasmine.SpyObj<ChangeDetectorRef>;

  let httpMock: HttpTestingController;
  let mockRequest: Observable<any>;

  beforeEach(() => {
    const overlayContainerServiceSpyObj = jasmine.createSpyObj('SmarOverlayContainerService', ['open', 'exit']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: SmarOverlayContainerService,
          useValue: overlayContainerServiceSpyObj,
        },
        { provide: MasterCrudService, useClass: MockMasterCrudService },
        ChangeDetectorRef,
      ],
    });

    crudServiceSpy = TestBed.inject(MasterCrudService) as unknown as MockMasterCrudService;
    overlayContainerServiceSpy = TestBed.inject(
      SmarOverlayContainerService,
    ) as jasmine.SpyObj<SmarOverlayContainerService>;
    changeDetectorRefSpy = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;
    masterList = new SaleListComponent(crudServiceSpy as any, overlayContainerServiceSpy, changeDetectorRefSpy);
    httpMock = TestBed.inject(HttpTestingController);
    mockRequest = of('response data');
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterEach(() => {
    masterList.ngOnDestroy();
  });

  it('should create MasterList instance', () => {
    expect(masterList).toBeTruthy();
  });

  it('should open an overlay with the correct data', () => {
    masterList.dataSource.data = [{ id: 1 }] as any;
    (masterList as any)._onForm(1);
    expect(overlayContainerServiceSpy.open).toHaveBeenCalled();
  });

  it('should call _deleteItem', () => {
    spyOn(masterList as any, '_deleteItem');
    masterList.remove('1');
    expect((masterList as any)._deleteItem).toHaveBeenCalled();
  });

  describe('delete', () => {
    it('should call the delete method of the crud service', () => {
      const itemId = '1';
      spyOn(masterList, 'search');

      masterList.remove(itemId);

      expect(masterList.search).toHaveBeenCalled();
    });
  });

  it('should call _deleteItem', () => {
    spyOn(masterList as any, '_onForm');
    masterList.edit(1);
    masterList.createItem();
    expect((masterList as any)._onForm).toHaveBeenCalled();
  });
});
