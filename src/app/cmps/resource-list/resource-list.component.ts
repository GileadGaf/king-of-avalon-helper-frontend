import { Component, Input, OnInit } from '@angular/core';
import { Resource } from 'src/app/models/resource';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {
  @Input() resources: Resource[];
  @Input() userResourcesAmount;
  constructor() { }

  ngOnInit(): void {
  }

}
