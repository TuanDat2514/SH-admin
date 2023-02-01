import { Component, OnInit } from '@angular/core';
import { DiscountService } from "../../_sevices/discount/discount.service";
import { Discount } from "../../../assets/interface/interface";
import { createMessage } from "../../../environments/helper";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  listOfColumn = [
    {
      title: 'ID',
      compare: (a: Discount, b: Discount) => a.id - b.id,
      priority: 1
    },
    {
      title: 'Mã giảm giá',
      compare: (a: Discount, b: Discount) => a.code.localeCompare(b.code),
      priority: 3
    },
    {
      title: 'Giảm giá (%)',
      compare: (a: Discount, b: Discount) => a.discount - b.discount,
      priority: 2
    },
    {
      title: 'Trạng thái',
      compare: (a: Discount, b: Discount) => a.status - b.status,
      priority: 4
    },
  ];
  listOfData: Discount[] = [];

  constructor(private discountService: DiscountService,private message: NzMessageService) {
    document.title = "Khuyến mãi";
  }

  isVisible = false;
  isOkLoading = false;
  selected!:Discount;
  showModal(discount:Discount): void {
    this.isVisible = true;
    this.selected = discount;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.discountService.updateDiscount({...this.selected,status:this.selected.status == 1 ? 0 : 1}).subscribe(res => {
      if(res.status === 200){
        this.isOkLoading = false;
        this.isVisible = false;
        createMessage(this.message,"success","Cập nhật");
        this.displayData();
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.displayData();
  }

  displayData() {
    this.discountService.getAllDiscount().subscribe(res => {
      this.listOfData = res;
    })
  }
}
