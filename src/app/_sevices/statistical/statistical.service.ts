import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PARAM, URL_ROOT } from "../../../environments/param";
import { Report } from "../../../assets/interface/interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

  constructor(private http:HttpClient) { }

  getReport():Observable<Report>{
    return this.http.get<Report>(`${URL_ROOT}/${PARAM.GET_REPORT}`);
  }

  getStatistical():Observable<Report>{
    return this.http.get<Report>(`${URL_ROOT}/${PARAM.GET_REPORT_ALL}`);
  }
}
