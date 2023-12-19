import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DetailShipping, Received } from "../../../assets/interface/interface";
import { PARAM, URL_ROOT } from "../../../environments/param";

@Injectable({
  providedIn: 'root'
})
export class ReceivedService {

  constructor(private http:HttpClient) {
  }
  getListReceived(){
    return this.http.get<Array<Received>>(`${URL_ROOT}/${PARAM.GET_LIST_RECEIVED}`);
  }
  updateReceived(id:number,status:number){
    return this.http.put(`${URL_ROOT}/${PARAM.UPDATE_RECEIVED}?id_cart=${id}&status=${status}`,undefined,{observe:"response"});
  }

  getDetailShipping(cart_id:number){
    return this.http.get<DetailShipping>(`${URL_ROOT}/${PARAM.GET_DETAIL}/${cart_id}`);
  }
  getReceivedById(id:any){
    return this.http.get<any>(`${URL_ROOT}/${PARAM.GET_RECEIVED_BY_ID}/${id}`);
  }
}
