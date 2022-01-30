import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ResourceItem } from '../models/resource-item';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceItemResolverService implements Resolve<Observable<ResourceItem>> {

  constructor(private resourceService: ResourceService) { }
  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.resourceService.getResourceItemById(id);
  }
}
