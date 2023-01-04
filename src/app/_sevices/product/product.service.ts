import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PARAM,URL_ROOT } from "../../../environments/environment";
import { Product } from "../../../assets/interface/interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(){
    return this.http.get<Array<Product>>(`${URL_ROOT}/${PARAM.GET_ALL_PRODUCT}`);
  }
}
