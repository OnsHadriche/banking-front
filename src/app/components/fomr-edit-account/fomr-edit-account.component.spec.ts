import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FomrEditAccountComponent } from './fomr-edit-account.component';

describe('FomrEditAccountComponent', () => {
  let component: FomrEditAccountComponent;
  let fixture: ComponentFixture<FomrEditAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FomrEditAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FomrEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
