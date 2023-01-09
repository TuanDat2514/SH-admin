import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { ProductService } from "../../../_sevices/product/product.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit,OnChanges {
  @Input() visible = false;
  @Input() productSelected : any;
  @Output() closeDrawer = new EventEmitter<boolean>();
  constructor(private productService:ProductService) { }
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
    this.visible && this.productService.getProductbyId(this.productSelected.id_product).subscribe(res=>{
      console.log(res);
    })
  }

}
