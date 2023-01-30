import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PARAM, URL_ROOT } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Discount } from "../../../assets/interface/interface";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http:HttpClient) { }

  getAllDiscount():Observable<Array<Discount>>{
    return this.http.get<Array<Discount>>(`${URL_ROOT}/${PARAM.GET_ALL_DISCOUNT}`);
  }
}
