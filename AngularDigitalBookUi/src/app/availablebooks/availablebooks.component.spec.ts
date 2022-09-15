import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablebooksComponent } from './availablebooks.component';

describe('AvailablebooksComponent', () => {
  let component: AvailablebooksComponent;
  let fixture: ComponentFixture<AvailablebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablebooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailablebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
