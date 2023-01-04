import { Component, EventEmitter, Input, OnInit, Output,OnChanges,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-detail-received',
  templateUrl: './detail-received.component.html',
  styleUrls: ['./detail-received.component.scss']
})
export class DetailReceivedComponent implements OnInit,OnChanges {
  @Input() visible = false;
  @Input() cartIdSelected : number = 0;
  @Output() closeDrawer = new EventEmitter<boolean>();
  constructor() { }

  ngOnChanges() {
    this.visible && console.log(this.cartIdSelected);
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.closeDrawer.emit(false);
  }
  ngOnInit(): void {
  }

}
