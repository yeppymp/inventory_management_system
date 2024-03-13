import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormSupplierComponent } from './dialog-form-supplier.component';

describe('DialogFormSupplierComponent', () => {
  let component: DialogFormSupplierComponent;
  let fixture: ComponentFixture<DialogFormSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogFormSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
