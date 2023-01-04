import { Component, OnInit } from '@angular/core';
import { ReceivedService } from "../../_sevices/received/received.service";
import { Received } from "../../../assets/interface/interface";


interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
  status: number
}

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
      compare: (a: DataItem, b: DataItem) => a.status - b.status,
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
  handleOk(): void {
    this.isOkLoading = true;
    this.receivedService.updateRecevied(this.itemSelected.id_cart,{
      ...this.itemSelected,status:this.itemSelected.status === 0 ? 1 : 0
    }).subscribe(res =>{
      if(res.status === 200){
        this.isOkLoading = false;
        this.isVisible = !this.isVisible;
        this.displayData();
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(private receivedService:ReceivedService) {
  }

  handleClickRecord(record: Received) {
    this.isVisible = !this.isVisible;
    this.itemSelected = record;
  }
  displayData(){
    this.receivedService.getListRecevied().subscribe(res =>{
      this.listOfData = res;
    })
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.receivedService.getListRecevied().subscribe(res =>{
      this.isLoading = false;
      this.listOfData = res;
    })
  }

}
