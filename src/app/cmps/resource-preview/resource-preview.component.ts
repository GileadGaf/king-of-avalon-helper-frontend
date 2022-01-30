import { Component, Input, OnInit } from '@angular/core';
import { Resource } from 'src/app/models/resource';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-resource-preview',
  templateUrl: './resource-preview.component.html',
  styleUrls: ['./resource-preview.component.scss']
})
export class ResourcePreviewComponent implements OnInit {
  @Input() resource: Resource;
  @Input() userResourcesAmount;
  constructor(private utilitiesService:UtilitiesService) { }

  ngOnInit(): void {
  }

  public get resourceAmount() {
    const resourceTypeKey = {
      1: 'food',
      2: 'wood',
      3: 'iron',
      4: 'silver'
    };
    return this.utilitiesService.getVisualDisplay(this.userResourcesAmount[resourceTypeKey[this.resource.id]]);
  }

}
