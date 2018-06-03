import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOrdersComponent } from './shared-orders.component';

describe('SharedOrdersComponent', () => {
  let component: SharedOrdersComponent;
  let fixture: ComponentFixture<SharedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
