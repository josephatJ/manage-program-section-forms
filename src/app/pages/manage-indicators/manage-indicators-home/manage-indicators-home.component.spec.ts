import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIndicatorsHomeComponent } from './manage-indicators-home.component';

describe('ManageIndicatorsHomeComponent', () => {
  let component: ManageIndicatorsHomeComponent;
  let fixture: ComponentFixture<ManageIndicatorsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIndicatorsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIndicatorsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
