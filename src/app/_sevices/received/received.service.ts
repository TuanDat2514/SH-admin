import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PARAM,URL_ROOT } from "../../../environments/environment";
import { Received } from "../../../assets/interface/interface";

@Injectable({
  providedIn: 'root'
})
export class ReceivedService {

  constructor(private http:HttpClient) {
  }
  getListRecevied(){
    return this.http.get<Array<Received>>(`${URL_ROOT}/${PARAM.GET_LIST_RECEIVED}`);
  }
  updateRecevied(id:number,body:Received){
    return this.http.put(`${URL_ROOT}/${PARAM.UPDATE_RECEIVED}/${id}`,body,{observe:"response"});
  }
}
