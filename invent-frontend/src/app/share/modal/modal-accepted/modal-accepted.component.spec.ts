import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAcceptedComponent } from './modal-accepted.component';

describe('ModalAcceptedComponent', () => {
  let component: ModalAcceptedComponent;
  let fixture: ComponentFixture<ModalAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAcceptedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
