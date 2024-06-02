import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleEarnRegisterModalComponent } from './simple-earn-register-modal.component';

describe('SimpleEarnRegisterModalComponent', () => {
  let component: SimpleEarnRegisterModalComponent;
  let fixture: ComponentFixture<SimpleEarnRegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleEarnRegisterModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleEarnRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
