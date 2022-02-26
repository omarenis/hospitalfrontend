import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouKnowComponent } from './you-know.component';

describe('YouKnowComponent', () => {
  let component: YouKnowComponent;
  let fixture: ComponentFixture<YouKnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouKnowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouKnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
