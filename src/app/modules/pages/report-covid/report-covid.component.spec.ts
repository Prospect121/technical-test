import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportCovidComponent } from './report-covid.component';
import { ChangeDetectorRef } from '@angular/core';
import { ProcessDataCovidService } from 'src/app/core/services/process-data-covid/process-data-covid.service';
import { Subscription, of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('ReportCovidComponent', () => {
  let component: ReportCovidComponent;
  let fixture: ComponentFixture<ReportCovidComponent>;
  let processDataCovidService: ProcessDataCovidService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportCovidComponent],
      imports: [TranslateModule.forRoot()],
      providers: [ChangeDetectorRef, ProcessDataCovidService],
    });

    fixture = TestBed.createComponent(ReportCovidComponent);
    component = fixture.componentInstance;
    processDataCovidService = TestBed.inject(ProcessDataCovidService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /*it('should set the data from ProcessDataCovidService', () => {
    const testData = {
      maxStateName: 'TestMaxStateName',
      maxState: 100,
      minStateName: 'TestMinStateName',
      minState: 10,
      mostAffected: { key: 'value' },
      dataForGraph: { label: ['Label'], percentages: [50], backgroundColor: ['rgba(0, 0, 0, 0)'] },
    };
    testData;
    const subscribeSpy = spyOn(processDataCovidService.resultDate, 'subscribe').and.returnValue(testData as any);

    component.ngOnInit();

    expect(subscribeSpy).toHaveBeenCalled();
    expect(component.maxStateName).toEqual('TestMaxStateName');
    expect(component.maxState).toEqual(100);
    expect(component.minStateName).toEqual('TestMinStateName');
    expect(component.minState).toEqual(10);
    expect(component.mostAffected).toEqual({ key: 'value' });
    expect(component.dataForGraph).toEqual({
      label: ['Label'],
      percentages: [50],
      backgroundColor: ['rgba(0, 0, 0, 0)'],
    });
  });*/

  it('should call processDataCovidService onUpload', () => {
    const onUploadSpy = spyOn(processDataCovidService, 'onUpload');

    component.onUpload({ target: { files: [new File([], 'test.csv')] } });

    expect(onUploadSpy).toHaveBeenCalled();
  });

  it('should call _dataSet', () => {
    const labels = ['Label1', 'Label2'];
    const data = [10, 20];
    const backgroundColor = ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)'];

    const dataSet = component['_dataSet'](labels, data, backgroundColor);

    expect(dataSet).toEqual({
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColor,
        },
      ],
    });
  });
  /*
  it('should set and get data for Chart', () => {
    const chartData = {
      labels: ['Label1', 'Label2'],
      datasets: [
        {
          data: [10, 20],
          backgroundColor: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)'],
        },
      ],
    };
    const contextSpy = spyOn(component as any, 'getContext').and.returnValue({});
    component as any;
    component['_getData'](chartData);

    expect(contextSpy).toHaveBeenCalled();
    expect(component.dataSet).toBeDefined();
  });

  
  it('should fill the data set for Chart', () => {
    component.dataSet = new Chart({} as CanvasRenderingContext2D, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });
    const chartUpdateSpy = spyOn(component.dataSet, 'update');

    component['_fillDataSet']();

    expect(chartUpdateSpy).toHaveBeenCalled();
  });*/

  it('should unsubscribe from subscriptions on destroy', () => {
    const subscription = new Subscription();
    const unsubscribeSpy = spyOn(subscription, 'unsubscribe');
    (component as any).subscriptions.push(subscription);

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
