import { Component, OnInit } from '@angular/core';
import { Received } from "../../../../assets/interface/interface";
import { ReceivedService } from "../../../_sevices/received/received.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import { createMessage } from 'src/environments/helper';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {
  listOfColumn:any = [
    {
      title: 'Mã đơn hàng',
      compare: (a: Received, b: Received) => a.id_cart - b.id_cart,
      priority: false
    },
    {
      title: 'Mã người dùng',
      compare: (a: Received, b: Received) => a.id_user - b.id_user,
      priority: 6
    },
    {
      title: 'Ngày đặt',
      compare: (a: Received, b: Received) => a.date.localeCompare(b.date),
      priority: 5
    },
    {
      title: 'Giá tiền',
      compare: (a: Received, b: Received) => a.subtotal - b.subtotal,
      priority: 4
    },
    {
      title: 'Giảm giá',
      compare: (a: Received, b: Received) => a.discount - b.discount,
      priority: 3
    },
    {
      title: 'Thành tiền',
      compare: (a: Received, b: Received) => a.total - b.total,
      priority: 2
    },
    {
      title: 'Status',
      compare: (a: Received, b: Received) => a.status - b.status,
      priority: 1
    },
  ];
  listOfData: Received[] = [];
  isVisible = false;
  isOkLoading = false;
  index!: number;
  totalItem = this.listOfData.length;
  pageSize = 10;
  itemSelected!:Received;
  isLoading!:boolean;
  inputValue:any;
  constructor(private receivedService:ReceivedService,private message:NzMessageService) {
    document.title = "Đơn hàng";
  }
  handleOk(): void {
    this.isOkLoading = true;

  }
  handleSearch(){
    this.receivedService.getReceivedById(this.inputValue).subscribe(res=>{
      this.listOfData = [];
      this.listOfData.push(res.cart);
      if (!res.cart) {
        createMessage(this.message, 'message', "Không có đơn hàng này")
      }
    })
  }
  handleCancel(event:any): void {
    this.isVisible = event;
  }


  handleClickRecord(record: Received) {
    this.isVisible = true;
    this.itemSelected = record;
  }
  displayData(){
    this.isLoading = true;
    this.receivedService.getListReceived().subscribe(res =>{
      this.isLoading = false;
      this.listOfData = res.reverse();
    })
  }
  ngOnInit(): void {
    this.displayData()
  }

}
