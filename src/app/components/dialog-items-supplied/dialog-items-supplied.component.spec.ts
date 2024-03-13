import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogItemsSuppliedComponent } from './dialog-items-supplied.component';

describe('DialogItemsSuppliedComponent', () => {
  let component: DialogItemsSuppliedComponent;
  let fixture: ComponentFixture<DialogItemsSuppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogItemsSuppliedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogItemsSuppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
