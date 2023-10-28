import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SaleFormComponent } from './sale-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { MasterCrudService } from 'src/app/core/services/master-crud/master-crud.service';
import { MockMasterCrudService } from 'src/app/core/model/master-form/master-form.spec';
import { FormErrorsService } from 'src/app/core/services/form-errors/form-errors.service';
import { SmarOverlayContainerService } from 'src/app/core/services/overlay-container/overlay-container.service';
import { SaleAdapter } from './adapters/sale-adapter';

class FakeAdapter {}

describe('SaleFormComponent', () => {
  let component: SaleFormComponent;
  let mockCrudService: MockMasterCrudService;
  let smarOverlayContainerService: jasmine.SpyObj<SmarOverlayContainerService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleFormComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
    });
    smarOverlayContainerService = TestBed.inject(
      SmarOverlayContainerService,
    ) as jasmine.SpyObj<SmarOverlayContainerService>;
    let fb = TestBed.inject(FormBuilder);
    const dependencies: any[] = [];
    const adapter: any = FakeAdapter;
    mockCrudService = TestBed.inject(MasterCrudService) as unknown as MockMasterCrudService;
    const formErrorsService = TestBed.inject(FormErrorsService);
    const uri: string = '';
    component = new SaleFormComponent(
      fb,
      mockCrudService as any,
      smarOverlayContainerService,
      formErrorsService,
      dependencies,
      adapter,
      uri,
      {},
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form controls', () => {
    const formControls = component.form.controls;
    expect(formControls['documentType']).toBeDefined();
    expect(formControls['documentNumber']).toBeDefined();
  });

  it('should enable internationalShippingTypeField when shippingTypeField is INTERNATIONAL', fakeAsync(() => {
    component.ngOnInit();
    component.shippingTypeField?.setValue('INTERNATIONAL');
    component.paymentMethodTypeField?.setValue(1);
    tick();

    expect(component.internationalShippingTypeField?.enabled).toBeTruthy();
  }));

  it('should disable internationalShippingTypeField when shippingTypeField is NATIONAL', fakeAsync(() => {
    component.ngOnInit();
    component.shippingTypeField?.setValue('NATIONAL');
    component.paymentMethodTypeField?.setValue('');
    tick();

    expect(component.internationalShippingTypeField?.disabled).toBeTruthy();
  }));

  it('should return a valid SaleAdapter instance with form data', () => {
    const body = (component as any).getBody();

    expect(body instanceof SaleAdapter).toBe(true);

    expect(body.documentType).toBe('');
  });
});
