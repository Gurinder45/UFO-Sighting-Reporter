import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Report } from 'src/app/report';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UfoService {
  reports: Report[] = [];
  constructor(private http:HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>("https://272.selfip.net/apps/o4g0czPLSe/collections/report-list/documents/reports/");     
  }

  deleteReport(): Observable<Report[]> {
    return this.http.delete<Report[]>("https://272.selfip.net/apps/o4g0czPLSe/collections/report-list/documents/reports/");
  }

  postReports(obj: object): Observable<object> {
    return this.http.post("https://272.selfip.net/apps/o4g0czPLSe/collections/report-list/documents/",obj, httpOptions);
  }
}
