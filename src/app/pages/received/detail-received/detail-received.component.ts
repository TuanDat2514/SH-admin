import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ReceivedService } from "../../../_sevices/received/received.service";
import { Detail, Received } from "../../../../assets/interface/interface";

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
  isVisible = false;
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
    this.receivedService.updateRecevied(this.cartSelected.id_cart,{
      ...this.cartSelected,status:this.cartSelected.status === 0 ? 1 : 0
    }).subscribe(res =>{
      if(res.status === 200){
        this.isOkLoading = false;
        this.isVisible = !this.isVisible;
        this.refreshData.emit();
      }
    })
  }
}
