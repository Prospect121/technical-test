import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterCrudService } from '../../services/master-crud/master-crud.service';
import { SmarOverlayContainerService } from '../../services/overlay-container/overlay-container.service';
import { FormErrorsService } from '../../services/form-errors/form-errors.service';
import { MasterForm } from './master-form';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { Inject, Optional } from '@angular/core';
import { IControls } from '../../interfaces/icontrols';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICrudder } from '../../interfaces/icrudder';

class MockTranslationService {}
export class MockMasterCrudService {
  getCrudder(uri: string, uriComplement: string): ICrudder {
    return {
      post: (body: any, params?: any) => {
        return of({});
      },
      put: (body) => of({}),
    } as ICrudder;
  }

  getDependency(path: string, header: boolean = true): Observable<any> {
    return of({});
  }
}
class MockSmarOverlayContainerService {
  close() {}
}
class MockFormErrorsService {
  showFormErrors(form: FormGroup): void {}
}
class FakeAdapter {
  name: string;
  age: number;
  constructor(data: any) {
    ({ name: this.name, age: this.age } = data);
  }
}

class MockActivatedRoute {
  snapshot = { params: {}, data: {} };
}

class MasterComponent extends MasterForm {
  constructor(
    protected fb: FormBuilder,
    crudService: MasterCrudService,
    smarOverlayContainerService: SmarOverlayContainerService,
    formErrorsService: FormErrorsService,
    @Inject('dependencies') protected override dependencies: any[],
    @Inject('adapter') protected override adapter: any,
    @Inject('uri') protected override uri: string,
    @Inject('dataForm') protected override dataForm: any,
  ) {
    super(fb, crudService, smarOverlayContainerService, formErrorsService, dependencies, adapter, uri, dataForm);
  }
}

describe('MasterForm', () => {
  let service: MasterForm;
  let mockCrudService: MockMasterCrudService;
  let httpMock: HttpTestingController;
  let formBuilder: FormBuilder;
  let mockRequest: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: MasterCrudService, useClass: MockMasterCrudService },
        { provide: SmarOverlayContainerService, useClass: MockSmarOverlayContainerService },
        { provide: FormErrorsService, useClass: MockFormErrorsService },
      ],
    });
    formBuilder = TestBed.inject(FormBuilder);

    let fb = TestBed.inject(FormBuilder);
    const dependencies: any[] = [];
    const adapter: any = FakeAdapter;
    mockCrudService = TestBed.inject(MasterCrudService) as unknown as MockMasterCrudService;
    const smarOverlayContainerService = TestBed.inject(SmarOverlayContainerService);
    const formErrorsService = TestBed.inject(FormErrorsService);
    const uri: string = '';
    service = new MasterComponent(
      fb,
      mockCrudService as any,
      smarOverlayContainerService,
      formErrorsService,
      dependencies,
      adapter,
      uri,
      {},
    );
    httpMock = TestBed.inject(HttpTestingController);
    mockRequest = of('response data');
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(service.form instanceof FormGroup).toBeTruthy();
  });

  it('should set editForm to false if there is no id', () => {
    expect(service.editForm).toBeFalse();
  });

  it('should set editForm to true if there is an id', () => {
    const activatedRoute: MockActivatedRoute = TestBed.inject(ActivatedRoute) as MockActivatedRoute;
    activatedRoute.snapshot.params = {
      id: '123',
      data: {
        initialDate: '2023-05-24',
        plannedClosingDate: '2023-06-14',
        closingDate: '2023-06-14',
        elapsedDays: 20,
        solution: 'Figma',
        observation: 'This is a new logo for my business',
      },
    };

    let fb = TestBed.inject(FormBuilder);
    const dependencies: any[] = [];
    const adapter: any = FakeAdapter;
    const crudService = TestBed.inject(MasterCrudService);
    const smarOverlayContainerService = TestBed.inject(SmarOverlayContainerService);
    const formErrorsService = TestBed.inject(FormErrorsService);
    const uri: string = '';
    service = new MasterComponent(
      fb,
      crudService,
      smarOverlayContainerService,
      formErrorsService,
      dependencies,
      adapter,
      uri,
      { data: { id: 1, name: 'unit test' } },
    );
    service.ngOnInit();
    expect(service.editForm).toBeTrue();
  });

  it('should get dependencies from the crudService', () => {
    const dependencies = [
      { name: 'dependency1', path: 'dependency1' },
      { name: 'dependency2', path: 'dependency2' },
    ];
    spyOn(mockCrudService, 'getDependency').and.returnValue(new Observable<any>());
    (service as any).dependencies = dependencies;
    service.ngOnInit();

    expect(mockCrudService.getDependency).toHaveBeenCalledTimes(dependencies.length);
  });

  it('should return the request as an Observable if "returnObs" is true', () => {
    spyOn(service as any, '_send').and.returnValue(of('success'));

    const result = service.onSave(true);

    expect(result).toBeInstanceOf(Observable);
    expect((service as any)._send).toHaveBeenCalledWith(true);
  });

  it('should assign actionForm.success when calling next', () => {
    spyOn(service as any, 'close');
    (service as any)._sendRequest(mockRequest);
    expect(service.close).toHaveBeenCalled();
  });

  it('should create the request body based on the value', () => {
    const body = (service as any).getBody();

    expect(body.documentType).toBe(undefined);
  });

  it('should create the request body based on the value', () => {
    const mockValue = { name: 'John', age: 30 };
    const mockGetBody = jasmine.createSpy('getBody').and.returnValue(mockValue);

    (service as any).getBody = mockGetBody;

    service['_send'](false);

    expect(mockGetBody).toHaveBeenCalled();
  });

  it('should return true if the section is valid in the form', () => {
    service.form = formBuilder.group({
      name: new FormControl('Erick', Validators.required),
      email: new FormControl('', Validators.email),
    });

    const result = service.isValidForm();
    expect(result).toBe(true);
  });

  it('should return false if the entire form is invalid', () => {
    service.form = formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
    });
    const formErrorsService: MockFormErrorsService = TestBed.inject(
      FormErrorsService,
    ) as unknown as MockFormErrorsService;
    spyOn(formErrorsService, 'showFormErrors');

    const result = service.isValidForm();
    expect(formErrorsService.showFormErrors).toHaveBeenCalledWith(service.form);
    expect(result).toBe(false);
  });
});
