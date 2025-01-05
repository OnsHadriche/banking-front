import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FomrCreateAccountComponent } from './fomr-create-account.component';

describe('FomrCreateAccountComponent', () => {
  let component: FomrCreateAccountComponent;
  let fixture: ComponentFixture<FomrCreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FomrCreateAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FomrCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
