import { Component, OnInit } from '@angular/core';
import { DiscountService } from "../../_sevices/discount/discount.service";
import { Discount } from "../../../assets/interface/interface";

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

  constructor(private discountService: DiscountService) {
    document.title = "Khuyến mãi";
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
