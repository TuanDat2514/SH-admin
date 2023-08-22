import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PARAM, URL_ROOT} from "../../../environments/param";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }

  getAllBrand(){
    return  this.http.get(`${URL_ROOT}/${PARAM.GET_ALL_BRAND}`)
  }
}
