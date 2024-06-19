import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredAddressModalComponent } from './registered-address-modal.component';

describe('RegisteredAddressModalComponent', () => {
  let component: RegisteredAddressModalComponent;
  let fixture: ComponentFixture<RegisteredAddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisteredAddressModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
