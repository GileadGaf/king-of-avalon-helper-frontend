import { Component, Input, OnInit } from '@angular/core';
import { ResourceItem } from 'src/app/models/resource-item';

@Component({
  selector: 'app-resource-item-list',
  templateUrl: './resource-item-list.component.html',
  styleUrls: ['./resource-item-list.component.scss']
})
export class ResourceItemListComponent implements OnInit {
  @Input() resourceItems: ResourceItem[];
  @Input() color: string;
  constructor() { }

  ngOnInit(): void {
  }

}
