import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {DetailShipping, Received} from "../../../../../assets/interface/interface";
import {ReceivedService} from "../../../../_sevices/received/received.service";
import {createMessage} from "../../../../../environments/helper";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-detail-received',
  templateUrl: './detail-received.component.html',
  styleUrls: ['./detail-received.component.scss']
})
export class DetailReceivedComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() cartSelected!: Received;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() refreshData = new EventEmitter();
  detail!: DetailShipping;
  isVisible: any = false;
  isOkLoading = false;
  isLoading!: boolean;
  status!:number;
  constructor(private receivedService: ReceivedService,
              private msg: NzMessageService
  ) {
  }

  ngOnChanges() {
    this.visible && this.receivedService.getDetailShipping(this.cartSelected?.id_cart).subscribe((res: DetailShipping) => {
      this.detail = res;
    });
  }

  ngOnInit(): void {
  }

  handleOk(): void {
    this.isOkLoading = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  openModal(status:number) {
    this.isVisible = true;
    this.status= status;
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.closeDrawer.emit(false);
  }

  handleSubmit(status:number) {
    this.isOkLoading = true;
    this.receivedService.updateReceived(this.cartSelected.id_cart,status).subscribe(res => {
      this.isOkLoading = false;
      if (res.status === 200) {
        this.isVisible = !this.isVisible;
        this.refreshData.emit();
        if (this.cartSelected.status === 0) {
          createMessage(this.msg, "success", 'Xác nhận đơn hàng');
          this.cartSelected.status = 1;
        } else {
          createMessage(this.msg, "success", 'Huỷ đơn hàng');
          this.cartSelected.status = 0;
        }
      } else {
        createMessage(this.msg, "error", 'Xác nhận đơn hàng');
      }
    })
  }
}
