import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BDiscount, DiscountService} from "../../../../_sevices/discount/discount.service";
import {createMessage, genRandomCode} from "../../../../../environments/helper";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  @Input() visible : boolean = false;
  @Output() closeDrawer = new EventEmitter(false);
  @Output() refresh = new EventEmitter();

  discount!:number;
  code!:string;
  constructor(private discountService:DiscountService,private message:NzMessageService) { }

  ngOnInit(): void {
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.closeDrawer.emit(false)
  }

  handleRandomCode(){
    this.code = genRandomCode(12);
  }

  handleAddDiscount(){
    const body:BDiscount = {code:this.code,discount:Number(this.discount),status:0}
    this.discountService.addDiscount(body).subscribe(res =>{
      if(res.status === 200){
        this.close()
        this.refresh.emit();
        createMessage(this.message,'success',"Thêm mới");
      }else {
        createMessage(this.message,'error',"Thêm mới");
      }
    })
  }
}
