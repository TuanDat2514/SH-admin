import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Discount } from "../../../assets/interface/interface";
import { PARAM, URL_ROOT } from "../../../environments/param";

export interface BDiscount{
  code:string,
  discount:number,
  status:number
}

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  constructor(private http:HttpClient) { }

  getAllDiscount():Observable<Array<Discount>>{
    return this.http.get<Array<Discount>>(`${URL_ROOT}/${PARAM.GET_ALL_DISCOUNT}`);
  }

  updateDiscount(updateDiscount: Discount) {
    return this.http.put(`${URL_ROOT}/${PARAM.UPDATE_DISCOUNT}`,updateDiscount,{observe:"response"});
  }

  addDiscount(body:BDiscount){
    return this.http.post(`${URL_ROOT}/${PARAM.ADD_DISCOUNT}`,body,{observe:"response"});
  }

  deleteDiscount(id:number){
    return this.http.delete(`${URL_ROOT}/${PARAM.DELETE_DISCOUNT}?id=${id}`,{observe:"response"});
  }
}
