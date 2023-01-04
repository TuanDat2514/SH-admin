import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReceivedComponent } from './detail-received.component';

describe('DetailReceivedComponent', () => {
  let component: DetailReceivedComponent;
  let fixture: ComponentFixture<DetailReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailReceivedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
