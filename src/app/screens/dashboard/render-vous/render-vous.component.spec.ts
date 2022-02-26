import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderVousComponent } from './render-vous.component';

describe('RenderVousComponent', () => {
  let component: RenderVousComponent;
  let fixture: ComponentFixture<RenderVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderVousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
