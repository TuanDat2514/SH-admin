import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from "../../../assets/interface/interface";
import { Observable } from "rxjs";
import { PARAM, URL_ROOT } from "../../../assets/param";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct():Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`${URL_ROOT}/${PARAM.GET_ALL_PRODUCT}`);
  }
  updateProduct(body:Product){
    return this.http.put(`${URL_ROOT}/${PARAM.UPDATE_PRODUCT}`,body,{observe:"response"});
  }
  getProductbyId(id_product:string){
    return this.http.get<Product>(`${URL_ROOT}/${PARAM.GET_PRODUCT_BY_ID}/${id_product}`);
  }

  addProduct(body:any){
    return this.http.post(`${URL_ROOT}/${PARAM.ADD_PRODUCT}`,body,{observe: "response"});
  }

  deleteProduct(id_product:string){
    return this.http.delete(`${URL_ROOT}/${PARAM.DELETE_PRODUCT}/${id_product}`,{observe:"response"});
  }

  getStockProduct(id_product:string,id_brand:string){
    return this.http.get(`${URL_ROOT}/${PARAM.GET_STOCK_PRODUCT}/${id_product}?id_brand=${id_brand}`,{observe:"response"});
  }

  searchProduct(key:string){
    return this.http.get<Array<Product>>(`${URL_ROOT}/${PARAM.SEARCH_PRODUCT}=${key}`);
  }
}
