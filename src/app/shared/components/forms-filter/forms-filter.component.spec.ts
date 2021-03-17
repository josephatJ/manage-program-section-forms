import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsFilterComponent } from './forms-filter.component';

describe('FormsFilterComponent', () => {
  let component: FormsFilterComponent;
  let fixture: ComponentFixture<FormsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
