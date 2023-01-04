import { Component, OnInit } from '@angular/core';
import { Product } from "../../../assets/interface/interface";
import { ProductService } from "../../_sevices/product/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private productService:ProductService) { }
  editCache: { [key: string]: { edit: boolean; data: Product } } = {};
  listOfData: Product[] = [];
  list!:Product[];
  pageSize=5;
  totalItem!:number;
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id_product === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id_product === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id_product] = {
        edit: false,
        data: { ...item }
      };
    });
  }


  ngOnInit(): void {
    this.productService.getAllProduct().subscribe(res =>{
      this.totalItem = res.length;
      const data:any = [];
      for (let i = 0; i < res.length; i++) {
        data.push({
          id_product:res[i].id_product,
          name:res[i].name,
          color:res[i].color,
          price:res[i].price,
          description:res[i].description,
          trending:res[i].trending,
          gender:res[i].gender,
          img:res[i].img,
          sub_img:res[i].sub_img,
          stock:res[i].stock
        });
      }
      this.listOfData = data;
      this.updateEditCache();
    });
  }

}
