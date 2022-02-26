import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsIdComponent } from './patients-id.component';

describe('PatientsIdComponent', () => {
  let component: PatientsIdComponent;
  let fixture: ComponentFixture<PatientsIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
