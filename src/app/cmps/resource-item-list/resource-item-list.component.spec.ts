import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceItemListComponent } from './resource-item-list.component';

describe('ResourceItemListComponent', () => {
  let component: ResourceItemListComponent;
  let fixture: ComponentFixture<ResourceItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
