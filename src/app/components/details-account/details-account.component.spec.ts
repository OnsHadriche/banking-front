import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAccountComponent } from './details-account.component';

describe('DetailsAccountComponent', () => {
  let component: DetailsAccountComponent;
  let fixture: ComponentFixture<DetailsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
