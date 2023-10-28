import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICrudder, IGetQueryParams } from './../../interfaces/icrudder';

@Injectable({ providedIn: 'root' })
export class MasterCrudService {
  private readonly baseUrl: string = environment.baseUrl;
  private readonly defaultHeaders: HttpHeaders = new HttpHeaders({ SHOW_DEFAULT_ERROR_MODAL: '1' });

  constructor(private http: HttpClient) {}

  getCrudder(uri: string, uriComplement: string): ICrudder {
    if (!uri) {
      return {} as ICrudder;
    }

    const url = `${this.baseUrl}${uri}`;
    const headers = this.defaultHeaders;

    return {
      get: () => {
        return this.http.get(`${url}${uriComplement}`, { headers });
      },

      post: (body, params?, customHeaders?) => {
        const requestHeaders = params ? headers : this.defaultHeaders;
        const requestOptions = { headers: customHeaders || requestHeaders, params };
        return this.http.post(`${url}${uriComplement}`, body, requestOptions);
      },

      put: (body) => this.http.put(`${url}/${body?.id}`, body, { headers }),

      delete: (registryID) => this.http.delete(`${url}/${registryID}`, { headers }),
    };
  }

  getDependency(path: string, header: boolean = true): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    const headers = header ? this.defaultHeaders : undefined;
    const requestOptions = { headers };
    return this.http.get(url, requestOptions);
  }
}
