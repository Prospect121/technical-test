import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { ProcessDataCovidService } from 'src/app/core/services/process-data-covid/process-data-covid.service';
Chart.register(...registerables);

@Component({
  selector: 'app-report-covid',
  templateUrl: './report-covid.component.html',
  styleUrls: ['./report-covid.component.scss'],
})
export class ReportCovidComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  @ViewChild('canvas') canvas?: ElementRef;
  dataSet: any;

  acceptFile: string = '.csv';
  maxStateName: string = '';
  maxState: number = 0;

  minStateName: string = '';
  minState: number = 0;

  dataForGraph: any = {};

  mostAffected: any = {};

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _processDataCovidService: ProcessDataCovidService,
  ) {}

  ngOnInit(): void {
    const sub = this._processDataCovidService.resultDate.subscribe((value) => {
      if (!!value) {
        this.maxStateName = value?.maxStateName;
        this.maxState = value?.maxState;

        this.minStateName = value?.minStateName;
        this.minState = value?.minState;

        this.mostAffected = value?.mostAffected;
        this.dataForGraph = value?.dataForGraph;

        this._fillDataSet();
      }
    });
    this.subscriptions.push(sub);
  }

  ngAfterViewInit(): void {
    const dataSet = this._dataSet([], [], []);
    this._getData(dataSet);
    this._changeDetectorRef.detectChanges();
  }

  onUpload(event: any): void {
    this._processDataCovidService.onUpload(event);
  }

  private _dataSet(labels: string[], data: number[], backgroundColor: string[]): any {
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColor,
        },
      ],
    };
  }

  private _getData(data: any): void {
    this.context = this.canvas?.nativeElement.getContext('2d');
    this.dataSet = new Chart(this.context, {
      type: 'pie',
      data: data,
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
  }

  private _fillDataSet(): void {
    if (this.dataSet) {
      this.dataSet.data = this._dataSet([], [], []);
      this.dataSet.update();
      this.dataSet.clear();
    }

    if (this.dataSet && this.dataForGraph?.label?.length) {
      this.dataSet.data = this._dataSet(
        this.dataForGraph?.label,
        this.dataForGraph?.percentages,
        this.dataForGraph?.backgroundColor,
      );
      this.dataSet.update();
    }

    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }
}
