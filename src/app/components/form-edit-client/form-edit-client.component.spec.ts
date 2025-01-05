import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditClientComponent } from './form-edit-client.component';

describe('FormEditClientComponent', () => {
  let component: FormEditClientComponent;
  let fixture: ComponentFixture<FormEditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
