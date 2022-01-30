import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, pipe, throwError } from 'rxjs';
import { map, reduce,  } from 'rxjs/operators';

import { Resource } from '../models/resource';
import { ResourceItem } from '../models/resource-item';
import { ResourceItemType } from '../models/resource-item-type';
import {
  LoadingResourceItems,
  LoadingResources,
} from '../store/actions/resource.action';
import { UpdateUserResourceAmount } from '../store/actions/user.action';
import { State } from '../store/store';
import { UserService } from './user.service';
import { UtilitiesService } from './utilities.service';
const DEFAULT_RESOURCES = [
  new Resource(1, 'Food', 'yellow'),
  new Resource(2, 'Wood', '#A0522D'),
  new Resource(3, 'Iron', 'gray'),
  new Resource(4, 'Silver', 'white'),
];
const RESOURCE_KEY = 'resourceDb';
const RESOURCE_ITEM_KEY = 'resourceItemDb';
const rssItems = [];

const RSS_ITEM_TYPES = [
  new ResourceItemType('1', 1, 1000, '1k'),
  new ResourceItemType('2', 1, 3000, '3k'),
  new ResourceItemType('3', 1, 5000, '5k'),
  new ResourceItemType('4', 1, 10000, '10k'),
  new ResourceItemType('5', 1, 50000, '50k'),
  new ResourceItemType('6', 1, 150000, '150k'),
  new ResourceItemType('7', 1, 500000, '500k'),
  new ResourceItemType('8', 1, 1500000, '1.5M'),
  new ResourceItemType('9', 2, 1000, '1k'),
  new ResourceItemType('10', 2, 3000, '3k'),
  new ResourceItemType('11', 2, 5000, '5k'),
  new ResourceItemType('12', 2, 10000, '10k'),
  new ResourceItemType('13', 2, 50000, '50k'),
  new ResourceItemType('14', 2, 150000, '150k'),
  new ResourceItemType('15', 2, 500000, '500k'),
  new ResourceItemType('16', 2, 1500000, '1.5M'),
  new ResourceItemType('17', 3, 200, '200'),
  new ResourceItemType('18', 3, 600, '600'),
  new ResourceItemType('19', 3, 1000, '1k'),
  new ResourceItemType('20', 3, 2000, '2k'),
  new ResourceItemType('21', 3, 6000, '6k'),
  new ResourceItemType('22', 3, 10000, '10k'),
  new ResourceItemType('23', 3, 30000, '30k'),
  new ResourceItemType('24', 3, 300000, '300k'),
  new ResourceItemType('25', 4, 50, '50'),
  new ResourceItemType('26', 4, 150, '150'),
  new ResourceItemType('27', 4, 500, '500'),
  new ResourceItemType('28', 4, 1500, '1.5k'),
  new ResourceItemType('29', 4, 2500, '2.5k'),
  new ResourceItemType('30', 4, 7500, '7.5k'),
  new ResourceItemType('31', 4, 25000, '25k'),
  new ResourceItemType('32', 4, 75000, '75k'),
];

@Injectable({
  providedIn: 'root',
})
export class ResourceService {

  private _resources: Resource[];
  private _resourceItems: ResourceItem[];
  private _resourceItemTypes: ResourceItemType[];
  constructor(
    private utilitiesService: UtilitiesService,
    private store: Store<State>
  ) {}

  public getResources(): Observable<Resource[]> {
    this.store.dispatch(new LoadingResources());
    this._resourceItemTypes = RSS_ITEM_TYPES;
    let resources = this.utilitiesService.getFromStorage(RESOURCE_KEY);
    if (!resources) {
      resources = [...DEFAULT_RESOURCES];
      this.utilitiesService.saveToStorage(RESOURCE_KEY, resources);
    }
    this._resources = [...resources];
    return of(resources);
  }

  public getResourceByTypeId(resourceTypeId: number): Observable<Resource> {
    const selectedResource = this._resources.find(
      (resource) => resource.id === resourceTypeId
    );
    return of(selectedResource);
  }

  public getResourceItems(userId,resourceTypeId = 0): Observable<ResourceItem[]> {
    this.store.dispatch(new LoadingResourceItems());
    let resourceItems: ResourceItem[] =
      this.utilitiesService.getFromStorage(RESOURCE_ITEM_KEY);
    if (!resourceItems) {
      resourceItems = rssItems;
      this.utilitiesService.saveToStorage(RESOURCE_ITEM_KEY, resourceItems);
    }
    resourceItems = resourceItems.filter(resourceItem => resourceItem.userId === userId);
    if (resourceTypeId) {
      resourceItems = resourceItems.filter(
        ({ typeId }) => typeId === resourceTypeId
      );
    }
    resourceItems = resourceItems.sort((item1, item2) => item1.amount - item2.amount);
    this._resourceItems = resourceItems;
    return of(resourceItems);
  }

  public getResourceItemTypesByTypeId(
    resourceTypeId: number
  ): Observable<ResourceItemType[]> {
    const resourceItemTypes = this._resourceItemTypes.filter(
      (resourceItemType) => resourceItemType.typeId === resourceTypeId
    );
    return of(resourceItemTypes);
  }

  public saveResourceItem(newResourceItem: ResourceItem): Observable<any> {
    if (newResourceItem.quantity < 0) return throwError('Invalid item');
    let savedResourcesItem = { ...newResourceItem };
    let isNew = true;
    //Checking if there is already item from same user,type and amount type
    const existsResourceItem = this._getExistsResourceItem(savedResourcesItem);
    if (!existsResourceItem) {
      savedResourcesItem._id = this.utilitiesService.makeid(5);
      this._updateResourceItemsStorage(savedResourcesItem, isNew);
    } else {
      let { quantity: newQuantity } = savedResourcesItem;
      isNew = false;
      if (!savedResourcesItem._id) {
           //adding more resource to an exist item -User added a new item without knowing it exists
        //Removing duplicates of same resource item type
        savedResourcesItem = {
          ...existsResourceItem,
          quantity: newQuantity + existsResourceItem.quantity,
        };
      } 
      // update rss item in store
      this._updateResourceItemsStorage(savedResourcesItem, isNew);
    }
    const userResourceAmount = this._getResourceAmountOfUser(
      savedResourcesItem.typeId,
      savedResourcesItem.userId
    );
    console.log(userResourceAmount);
    this.store.dispatch(
      new UpdateUserResourceAmount(
        savedResourcesItem.typeId,
        userResourceAmount
      )
    );
    return of([isNew, { ...savedResourcesItem }]);
  }

  public getResourceItemsByTypeId(typeId: number): Observable<ResourceItem[]> {
    const requestedResourceItems = this._resourceItems.filter(
      (resourceItem) => resourceItem.typeId === typeId
    );
    return of(requestedResourceItems);

  }

  public getEmptyResourceItem(typeId, amount, userId) {
    return new ResourceItem('', typeId, amount, 0, userId);
  }

  public getResourceItemById(resourceItemId) {
    const selectedResourceItem = this._resourceItems.find(
      (resourcItem) => resourcItem._id === resourceItemId
    );
    return of({ ...selectedResourceItem });
  }


  private _getResourceAmountOfUser(resourceTypeId, userId) {
    let resourceItems = this.utilitiesService.getFromStorage(
      RESOURCE_ITEM_KEY
    ) as ResourceItem[];
    console.log(resourceTypeId, userId);
    const totalAmount = resourceItems.reduce(
      (acc, resourceItem) => {
        if (resourceItem.typeId === resourceTypeId && resourceItem.userId === userId) {
          acc += resourceItem.amount * resourceItem.quantity
        }
        return acc;
      },0
    );
    return totalAmount;
  }

  private _getExistsResourceItem({ typeId, amount, userId }) {
    let resourceItems = this.utilitiesService.getFromStorage(
      RESOURCE_ITEM_KEY
    ) as ResourceItem[];
    return resourceItems.find(
      (resourceItem) =>
        resourceItem.typeId === typeId &&
        resourceItem.amount === amount &&
        resourceItem.userId === userId
    );
  }

  private _updateResourceItemsStorage(resourceItem: ResourceItem, isNew) {
    let resourceItems = this.utilitiesService.getFromStorage(
      RESOURCE_ITEM_KEY
    ) as ResourceItem[];
    if (isNew) {
      resourceItems = [...resourceItems, resourceItem];
    } else {
      resourceItems = resourceItems.map((currResourceItem) =>
        currResourceItem._id === resourceItem._id
          ? resourceItem
          : currResourceItem
      );
    }
    this.utilitiesService.saveToStorage(RESOURCE_ITEM_KEY, resourceItems);
  }
}
