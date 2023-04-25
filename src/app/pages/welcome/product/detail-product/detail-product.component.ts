import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from "../../../../../assets/interface/interface";
import { ProductService } from "../../../../_sevices/product/product.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  @Input() visible = false;
  @Input() productSelected: any;
  @Output() closeDrawer = new EventEmitter<boolean>();
  product!: Product;
  sizeMan: any = [];
  sizeWoman: any[] = [];
  a:any;
  stockProduct:any[] = [];
  constructor(private productService: ProductService) { }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.closeDrawer.emit(false);
  }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.visible && this.productService.getProductbyId(this.productSelected.id_product).subscribe(res => {
        this.product = res;
        /*for (let i = 0; i < this.product.sizeWoman.length; i++) {
          for (let j = 0; j < this.product.stock.length; j++) {
            if (this.product.stock[j].id_size === this.product.sizeWoman[i].id_size) {
              this.sizeWoman.push({
                size: this.product.sizeWoman[i].size,
                amount: this.product.stock[j].amount
              });
            }
          }
        }
        for (let i = 0; i < this.product.sizeMan.length; i++) {
          for (let j = 0; j < this.product.stock.length; j++) {
            if (this.product.stock[j].id_size === this.product.sizeMan[i].id_size) {
              this.sizeMan.push({
                size: this.product.sizeMan[i].size,
                amount: this.product.stock[j].amount,
              });
            }
          }
        }*/
        this.productService.getStockProduct(res.id_product,res.id_brand).subscribe(res =>{
          this.a = res.body
          console.log(this.a);
          for (let i  = 0 ; i < this.a.length ; i++){
            if(this.a[i][1] === 0){
              this.sizeWoman.push({
                size: this.a[i][0],
                gender: this.a[i][1],
                amount:this.a[i][2]
              })
            }
            if(this.a[i][1] === 1){
              this.sizeMan.push({
                size: this.a[i][0],
                gender: this.a[i][1],
                amount:this.a[i][2]
              })
            }
          }
        })
      }
    )
    if (!this.visible) {
      this.sizeWoman = [];
    }
    if (!this.visible) {
      this.sizeMan = [];
    }
  }

}
