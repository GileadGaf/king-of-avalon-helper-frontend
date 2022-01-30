import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceItemEditComponent } from './resource-item-edit.component';

describe('ResourceItemEditComponent', () => {
  let component: ResourceItemEditComponent;
  let fixture: ComponentFixture<ResourceItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceItemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
