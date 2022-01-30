import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceItemPreviewComponent } from './resource-item-preview.component';

describe('ResourceItemPreviewComponent', () => {
  let component: ResourceItemPreviewComponent;
  let fixture: ComponentFixture<ResourceItemPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceItemPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
