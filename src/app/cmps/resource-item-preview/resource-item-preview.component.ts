import { Component, Input, OnInit } from '@angular/core';
import { ResourceItem } from 'src/app/models/resource-item';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-resource-item-preview',
  templateUrl: './resource-item-preview.component.html',
  styleUrls: ['./resource-item-preview.component.scss']
})
export class ResourceItemPreviewComponent implements OnInit {
  @Input() resourceItem: ResourceItem;
  public totalResourceItemAmount;
  @Input() color: string;
  constructor(private utilitiesService:UtilitiesService) { }

  ngOnInit(): void {
    this.totalResourceItemAmount = this.resourceItem.amount * this.resourceItem.quantity;
  }

  public get totalAmount() {
    return this.utilitiesService.getVisualDisplay(this.totalResourceItemAmount);
  }

}
