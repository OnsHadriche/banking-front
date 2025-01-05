import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAccountsClientComponent } from './all-accounts-client.component';

describe('AllAccountsClientComponent', () => {
  let component: AllAccountsClientComponent;
  let fixture: ComponentFixture<AllAccountsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAccountsClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAccountsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
