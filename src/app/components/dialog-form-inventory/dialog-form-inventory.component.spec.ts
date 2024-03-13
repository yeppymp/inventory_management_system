import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormInventoryComponent } from './dialog-form-inventory.component';

describe('DialogFormInventoryComponent', () => {
  let component: DialogFormInventoryComponent;
  let fixture: ComponentFixture<DialogFormInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogFormInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
