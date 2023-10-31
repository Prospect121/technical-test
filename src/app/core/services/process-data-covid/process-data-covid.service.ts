import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface CsvData {
  UID: any;
  iso2: any;
  iso3: any;
  code3: any;
  FIPS: any;
  Admin2: any;
  Province_State: any;
  Country_Region: any;
  Lat: any;
  Long_: any;
  Combined_Key: any;
  Population: any;
  [date: string]: any;
}

@Injectable({ providedIn: 'root' })
export class ProcessDataCovidService {
  private _resultDate$ = new Subject<any>();

  set(data: any): void {
    return this._resultDate$.next(data);
  }

  get resultDate(): Observable<any> {
    return this._resultDate$.asObservable();
  }

  public onUpload(event: any): void {
    const file: File = event.target.files[0];
    if (file instanceof File) {
      this._readCSV(file);
    } else {
      console.error('El archivo seleccionado no es válido.');
    }
  }

  private _readCSV(file: File) {
    const reader = new FileReader();
    let csvData: string | undefined;
    reader.onload = (e) => {
      csvData = e.target?.result as string;
      const csv = this._parseCSV(csvData);
      this._findStateWithHighestTotal(csv);
    };
    reader.readAsText(file);
  }

  private _parseCSV(csvString: string): CsvData[] {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');
    const data: CsvData[] = [];
    let current = headers[12];

    for (let i = 1; i < lines.length; i++) {
      let currentLineInit = lines[i].split('""');
      currentLineInit = currentLineInit.length == 3 ? currentLineInit : lines[i].split('"');
      if (!!currentLineInit[0]) {
        const currentLine = currentLineInit[0].split(',');
        let combinedKey = currentLineInit[1].split(',');
        let currentLinePopulationAndDate = currentLineInit[2].split(',');
        let population = currentLinePopulationAndDate[1];

        const rowData: CsvData = {
          UID: currentLine[0].split('"')[1] ?? currentLine[0],
          iso2: currentLine[1],
          iso3: currentLine[2],
          code3: parseInt(currentLine[3]),
          FIPS: parseInt(currentLine[4]),
          Admin2: currentLine[5],
          Province_State: currentLine[6],
          Country_Region: currentLine[7],
          Lat: parseFloat(currentLine[8]),
          Long_: parseFloat(currentLine[9]),
          Combined_Key: combinedKey,
          Population: parseInt(population),
        };

        for (let j = 2; j < currentLinePopulationAndDate.length; j++) {
          rowData[current] = parseInt(currentLinePopulationAndDate[j]);
          current = this._incrementDate(current) ?? '';
        }
        current = headers[12];
        data.push(rowData);
      }
    }
    return data;
  }

  private _findStateWithHighestTotal(dataList: CsvData[]): void {
    const dataResult: Record<string, { total: number; population: number; percentage: number }> = {};

    dataList.forEach((data) => {
      let total = 0;
      Object.keys(data).forEach((prop) => {
        if (this._isValidDateFormat(prop)) {
          total += data[prop];
        }
      });
      const { Province_State, Population } = data;
      dataResult[Province_State] = dataResult[Province_State] || { total: 0, population: 0 };
      dataResult[Province_State].total += total;
      dataResult[Province_State].population += Population;
      dataResult[Province_State].percentage = this._calculatePercentage(dataResult[Province_State]);
    });

    const { maxKey, maxValue, minKey, minValue } = this._findMaxAndMin(dataResult);

    const { maxStateName, maxState, minStateName, minState } = {
      maxStateName: maxKey,
      maxState: maxValue,
      minStateName: minKey,
      minState: minValue,
    };

    const mostAffected = this._findMaxPercentage(dataResult);
    const dataForGraph = this._getLabelAndPercentageData(dataResult);

    this.set({ maxStateName, maxState, minStateName, minState, mostAffected, dataForGraph });
  }

  private _findMaxPercentage(data: { [key: string]: { total: number; population: number; percentage: number } }): {
    key: string;
    percentage: number;
  } {
    let maxPercentage = -1;
    let maxKey = '';

    for (const key in data) {
      const percentage = data[key].percentage;
      if (percentage > maxPercentage) {
        maxPercentage = percentage;
        maxKey = key;
      }
    }

    return { key: maxKey, percentage: maxPercentage };
  }

  private _calculatePercentage(data: { total: number; population: number }): number {
    if (data.population === 0) {
      return 0; // Evitar división por cero
    }

    return (data.total / data.population) * 100;
  }

  private _getLabelAndPercentageData(data: {
    [key: string]: { total: number; population: number; percentage: number };
  }): { label: string[]; percentages: number[]; backgroundColor: string[] } {
    const label = Object.keys(data);
    const percentages = label.map((key) => data[key].percentage);
    const backgroundColor = label.map((_) => this._getRandomColor());
    return { label, percentages, backgroundColor };
  }

  private _findMaxAndMin(data: { [key: string]: { total: number; population: number } }): {
    maxKey: string;
    maxValue: number;
    minKey: string;
    minValue: number;
  } {
    let maxKey = '';
    let maxValue = Number.MIN_VALUE;
    let minKey = '';
    let minValue = Number.MAX_VALUE;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key].total;

        if (value > maxValue) {
          maxKey = key;
          maxValue = value;
        }

        if (value < minValue) {
          minKey = key;
          minValue = value;
        }
      }
    }

    return { maxKey, maxValue, minKey, minValue };
  }

  private _isValidDateFormat(dateString: string): boolean {
    const datePattern = /^\d{1,2}\/\d{1,2}\/\d{2}$/;
    return datePattern.test(dateString);
  }

  private _incrementDate(currentDate: string): string | null {
    const datePattern = /^\d{1,2}\/\d{1,2}\/\d{2}$/;
    if (!datePattern.test(currentDate)) {
      return null;
    }

    const [month, day, year] = currentDate.split('/').map(Number);

    const incrementedDay = day + 1;

    const daysInMonth = new Date(2000 + year, month, 0).getDate();

    if (incrementedDay <= daysInMonth) {
      const incrementedDate = `${month.toString().padStart(2, '0')}/${incrementedDay.toString().padStart(2, '0')}/${year
        .toString()
        .padStart(2, '0')}`;
      return incrementedDate;
    } else {
      let nextDay = 1;
      let nextMonth = month + 1;
      let nextYear = year;

      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear++;
      }

      const adjustedMonth = nextMonth.toString().padStart(2, '0');
      const adjustedYear = nextYear.toString().padStart(2, '0');

      const incrementedDate = `${adjustedMonth}/${nextDay.toString().padStart(2, '0')}/${adjustedYear}`;
      return incrementedDate;
    }
  }

  private _getRandomColor() {
    const min = 0;
    const max = 255;

    const red = Math.floor(Math.random() * (max - min + 1)) + min;
    const green = Math.floor(Math.random() * (max - min + 1)) + min;
    const blue = Math.floor(Math.random() * (max - min + 1)) + min;

    return `rgb(${red}, ${green}, ${blue})`;
  }
}
