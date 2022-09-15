import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishbookComponent } from './publishbook.component';

describe('PublishbookComponent', () => {
  let component: PublishbookComponent;
  let fixture: ComponentFixture<PublishbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
