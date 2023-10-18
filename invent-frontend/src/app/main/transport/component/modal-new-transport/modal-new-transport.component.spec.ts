import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewTransportComponent } from './modal-new-transport.component';

describe('ModalNewTransportComponent', () => {
  let component: ModalNewTransportComponent;
  let fixture: ComponentFixture<ModalNewTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
