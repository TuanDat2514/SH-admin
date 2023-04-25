import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Detail, Received } from "../../../../../assets/interface/interface";
import { ReceivedService } from "../../../../_sevices/received/received.service";

@Component({
  selector: 'app-detail-received',
  templateUrl: './detail-received.component.html',
  styleUrls: ['./detail-received.component.scss']
})
export class DetailReceivedComponent implements OnInit,OnChanges {
  @Input() visible = false;
  @Input() cartSelected! : Received;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() refreshData = new EventEmitter();
  detail!:Detail;
  isVisible:any = false ;
  isOkLoading = false;
  isLoading!:boolean;
  constructor(private receivedService: ReceivedService) { }

  ngOnChanges() {
    this.visible && this.receivedService.getDetail(this.cartSelected?.id_cart).subscribe((res:Detail) =>{
      this.detail=res;
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

  openModal(){
    this.isVisible = true;
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.closeDrawer.emit(false);
  }

  handleSubmit(){
    this.isOkLoading = true;
    this.receivedService.updateReceived(this.cartSelected.id_cart,{
      ...this.cartSelected,status:this.cartSelected.status === 0 ? 1 : 0
    }).subscribe(res =>{
      if(res.status === 200){
        this.isOkLoading = false;
        this.isVisible = !this.isVisible;
        this.refreshData.emit();
        if(this.cartSelected.status === 0){
          this.cartSelected.status = 1;
        }else {
          this.cartSelected.status = 0;
        }
      }
    })
  }
}
