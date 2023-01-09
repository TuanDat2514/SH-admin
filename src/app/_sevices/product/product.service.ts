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
  updateProduct(body:Product){
    return this.http.put(`${URL_ROOT}/${PARAM.UPDATE_PRODUCT}`,body,{observe:"response"});
  }
  getProductbyId(id_product:string){
    return this.http.get<Product>(`${URL_ROOT}/${PARAM.GET_PRODUCT_BY_ID}/${id_product}`);
  }
}
