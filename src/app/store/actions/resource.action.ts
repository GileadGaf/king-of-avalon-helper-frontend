import { Action } from '@ngrx/store';
import { Resource } from 'src/app/models/resource';
import { ResourceItem } from 'src/app/models/resource-item';
import { ResourceItemType } from 'src/app/models/resource-item-type';


export const SET_LOADING = '[set] loading';
export const SET_ERROR = '[set ] error';
export const LOAD_RESOURCES = '[resource]s load';
export const LOADED_RESOURCES = '[resource]s loaded';
export const LOAD_RESOURCE = '[resource] load';
export const LOADED_RESOURCE = '[resource] loaded';
export const LOAD_RESOURCE_ITEMS = '[resource item]s load';
export const LOADED_RESOURCE_ITEMS = '[resource item]s loaded';
export const LOAD_RESOURCE_ITEM = '[resource item] load';
export const LOADED_RESOURCE_ITEM = '[resource item] loaded';
export const LOAD_RESOURCE_ITEM_TYPES = '[resource item type]s load';
export const LOADED_RESOURCE_ITEMS_TYPES = '[resource item type]s loaded';
export const REMOVE_ITEM = '[item] remove';
export const REMOVED_ITEM = '[item] removed';
export const SAVE_RESOURCE_ITEM = '[resource item] saved';
export const ADDED_RESOURCE_ITEM = '[resource item] added';
export const UPDATED_RESOURCE_ITEM = '[resource item] updated';


export type resourceAction = LoadResources | LoadResource | LoadResourceItems | LoadResourceItemTypes  | SaveResourceItem


//Resources
export class LoadingResources implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) {}
}
export class LoadResources implements Action {
  readonly type = LOAD_RESOURCES;
  constructor() {}
}
export class LoadedResources implements Action {
  readonly type = LOADED_RESOURCES;
  constructor(public resources: Resource[] = []) {}
}
//Selected Resource
export class LoadingResource implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) {}
}
export class LoadResource implements Action {
  readonly type = LOAD_RESOURCE;
  constructor(public typeId:number) {}
}
export class LoadedResource implements Action {
  readonly type = LOADED_RESOURCE;
  constructor(public resource: Resource = null) {}
}
//Resource Items
export class LoadingResourceItems implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) {}
}
export class LoadResourceItems implements Action {
  readonly type = LOAD_RESOURCE_ITEMS;
  constructor(public userId:string,public resourceTypeId:number=0) {}
}
export class LoadedResourceItems implements Action {
  readonly type = LOADED_RESOURCE_ITEMS;
  constructor(public resourceItems: ResourceItem[] = []) {}
}
//Selected Resource
export class LoadingResourceItem implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) {}
}
export class LoadResourceItem implements Action {
  readonly type = LOAD_RESOURCE_ITEM;
  constructor() {}
}
export class LoadedResourceItem implements Action {
  readonly type = LOADED_RESOURCE_ITEM;
  constructor(public resourceItem: ResourceItem = null) {}
}
export class LoadResourceItemTypes implements Action {
  readonly type = LOAD_RESOURCE_ITEM_TYPES;
  constructor(public resourceTypeId:number) {}
}
export class LoadedResourceItemTypes implements Action {
  readonly type = LOADED_RESOURCE_ITEMS_TYPES;
  constructor(public resourceItemTypes: ResourceItemType[] = []) {}
}

// export class LoadItem implements Action {
//   readonly type = LOAD_ITEM;
//   constructor(public itemId: string = '') {}
// }
// export class RemoveItem implements Action {
//   readonly type = REMOVE_ITEM;
//   constructor(public itemId: string) {}
// }

export class RemovedItem implements Action {
  readonly type = REMOVED_ITEM;
  constructor(public itemId: string) {}
}
export class SaveResourceItem implements Action {
  readonly type = SAVE_RESOURCE_ITEM;
  constructor(public resourceItem: ResourceItem) {}
}
export class AddedResourceItem implements Action {
  readonly type = ADDED_RESOURCE_ITEM;
  constructor(public resourceItem: ResourceItem) {}
}
export class UpdatedResourceItem implements Action {
  readonly type = UPDATED_RESOURCE_ITEM;
  constructor(public resourceItem: ResourceItem) {}
}
export class LoadingItems implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) {}
}
export class ItemError implements Action {
  readonly type = SET_ERROR;
  constructor(public error: string) {}
}

