import { TestBed } from '@angular/core/testing';
import { ProcessDataCovidService } from './process-data-covid.service';

describe('ProcessDataCovidService', () => {
  let service: ProcessDataCovidService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessDataCovidService],
    });
    service = TestBed.inject(ProcessDataCovidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get data', () => {
    const testData = { some: 'data' };
    service.set(testData);
    service.resultDate.subscribe((data) => {
      expect(data).toEqual(testData);
    });
  });

  it('should handle file upload', () => {
    const event = { target: { files: [new File([], 'test.csv')] } };
    spyOn(service as any, '_readCSV').and.callThrough();
    service.onUpload(event);
    expect((service as any)._readCSV).toHaveBeenCalled();
  });

  it('should parse CSV data', () => {
    const csvString =
      'UID,iso2,iso3,code3,FIPS,Admin2,Province_State,Country_Region,Lat,Long_,Combined_Key,Population\n';
    const csvData = (service as any)._parseCSV(csvString);
    expect(Array.isArray(csvData)).toBe(true);
    expect(csvData.length).toBe(0); // Adjust this to match your test data
  });

  it('should set and get data', () => {
    const testData = { some: 'data' };
    service.set(testData);
    service.resultDate.subscribe((data) => {
      expect(data).toEqual(testData);
    });
  });

  it('should handle file upload', () => {
    const event = { target: { files: [new File([], 'test.csv')] } };
    spyOn(service as any, '_readCSV').and.callThrough();
    service.onUpload(event);
    expect((service as any)._readCSV).toHaveBeenCalled();
  });

  it('should parse CSV data', () => {
    const csvString =
      'UID,iso2,iso3,code3,FIPS,Admin2,Province_State,Country_Region,Lat,Long_,Combined_Key,Population\n';
    const csvData = (service as any)._parseCSV(csvString);
    expect(Array.isArray(csvData)).toBe(true);
    expect(csvData.length).toBe(0); // Adjust this to match your test data
  });

  it('should calculate percentage', () => {
    const total = 100;
    const population = 1000;
    const percentage = service['_calculatePercentage']({ total, population });
    expect(percentage).toBe(10); // Adjust this based on your test data
  });
});
