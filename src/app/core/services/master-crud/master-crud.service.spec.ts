import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MasterCrudService } from './master-crud.service';
import { environment } from 'src/environments/environment';

describe('MasterCrudService', () => {
  let service: MasterCrudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MasterCrudService],
    });
    service = TestBed.inject(MasterCrudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCrudder', () => {
    it('should return an ICrudder object', () => {
      const uri = 'test';
      const uriComplement = '/items';
      const crudder = service.getCrudder(uri, uriComplement);
      expect(crudder).toBeTruthy();
      expect(crudder.get).toBeDefined();
      expect(crudder.post).toBeDefined();
      expect(crudder.put).toBeDefined();
      expect(crudder.delete).toBeDefined();
    });

    it('should make a GET request', () => {
      const uri = 'test';
      const uriComplement = '/items';

      const response = [{ id: 1, name: 'Item 1' }];
      service
        .getCrudder(uri, uriComplement)
        .get()
        .subscribe((data) => {
          expect(data).toEqual(response);
        });

      const req = httpMock.expectOne(`${getBaseUrl()}${uri}${uriComplement}`);
      expect(req.request.method).toBe('GET');

      req.flush(response);
    });

    it('should make a POST request with body and params', () => {
      const uri = 'test';
      const uriComplement = '';
      const body = { name: 'Item 1' };
      const params = { param1: 1, param2: true };

      const response = { success: true };

      service
        .getCrudder(uri, uriComplement)
        .post(body, params)
        .subscribe((data) => {
          expect(data).toEqual(response);
        });

      const req = httpMock.expectOne(`${getBaseUrl()}${uri}?param1=1&param2=true`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      expect(req.request.params.get('param1')).toBe('1');
      expect(req.request.params.get('param2')).toBe('true');

      req.flush(response);
    });

    it('should make a POST request with body and default headers', () => {
      const uri = 'test';
      const uriComplement = '';
      const body = { name: 'Item 1' };

      const response = { success: true };

      service
        .getCrudder(uri, uriComplement)
        .post(body)
        .subscribe((data) => {
          expect(data).toEqual(response);
        });

      const req = httpMock.expectOne(`${getBaseUrl()}${uri}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      expect(req.request.headers.get('SHOW_DEFAULT_ERROR_MODAL')).toBe('1');

      req.flush(response);
    });

    it('should make a PUT request with body and default headers', () => {
      const uri = 'test';
      const uriComplement = '/items';
      const body = { id: 1, name: 'Item 1' };

      const response = { success: true };

      service
        .getCrudder(uri, uriComplement)
        .put(body)
        .subscribe((data) => {
          expect(data).toEqual(response);
        });

      const req = httpMock.expectOne(`${getBaseUrl()}${uri}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(body);
      expect(req.request.headers.get('SHOW_DEFAULT_ERROR_MODAL')).toBe('1');

      req.flush(response);
    });

    it('should make a DELETE request with registryID and default headers', () => {
      const uri = 'test';
      const uriComplement = '/items';
      const registryID = 1;

      const response = { success: true };

      service
        .getCrudder(uri, uriComplement)
        .delete(registryID)
        .subscribe((data) => {
          expect(data).toEqual(response);
        });

      const req = httpMock.expectOne(`${getBaseUrl()}${uri}/${registryID}`);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('SHOW_DEFAULT_ERROR_MODAL')).toBe('1');

      req.flush(response);
    });
  });

  describe('getDependency', () => {
    it('should make a GET request with default headers', () => {
      const path = 'crm/dependency';
      const response = { data: 'Dependency data' };

      service.getDependency(path).subscribe((data) => {
        expect(data).toEqual(response);
      });

      const req = httpMock.expectOne(`${getBaseUrl()}${path}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('SHOW_DEFAULT_ERROR_MODAL')).toBe('1');

      req.flush(response);
    });

    it('should make a GET request without default headers', () => {
      const path = 'dependency';
      const response = { data: 'Dependency data' };

      service.getDependency(path, false).subscribe((data) => {
        expect(data).toEqual(response);
      });

      const req = httpMock.expectOne(`${getBaseUrl()}${path}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.has('SHOW_DEFAULT_ERROR_MODAL')).toBe(false);

      req.flush(response);
    });
  });

  it('should not throw errors for null or undefined uri', () => {
    expect(() => service.getCrudder(null as any, '')).not.toThrow();
    expect(() => service.getCrudder(undefined as any, '')).not.toThrow();
  });

  function getBaseUrl(): string {
    return environment.baseUrl;
  }
});
