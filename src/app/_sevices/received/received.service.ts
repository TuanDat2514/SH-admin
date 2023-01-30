import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Detail, Received } from "../../../assets/interface/interface";
import { PARAM, URL_ROOT } from "../../../assets/param";

@Injectable({
  providedIn: 'root'
})
export class ReceivedService {

  constructor(private http:HttpClient) {
  }
  getListReceived(){
    return this.http.get<Array<Received>>(`${URL_ROOT}/${PARAM.GET_LIST_RECEIVED}`);
  }
  updateReceived(id:number,body:Received){
    return this.http.put(`${URL_ROOT}/${PARAM.UPDATE_RECEIVED}/${id}`,body,{observe:"response"});
  }

  getDetail(cart_id:number){
    return this.http.get<Detail>(`${URL_ROOT}/${PARAM.GET_DETAIL}/${cart_id}`);
  }
  getReceivedById(id:any){
    return this.http.get<Received>(`${URL_ROOT}/${PARAM.GET_RECEIVED_BY_ID}/${id}`);
  }
}
