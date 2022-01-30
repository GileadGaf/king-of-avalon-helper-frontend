import { createSelector } from '@ngrx/store';
import { Resource } from 'src/app/models/resource';
import { ResourceItem } from 'src/app/models/resource-item';
import { ResourceItemType } from 'src/app/models/resource-item-type';
import {
  ADDED_RESOURCE_ITEM,
  LOADED_RESOURCE,
  LOADED_RESOURCES,
  LOADED_RESOURCE_ITEM,
  LOADED_RESOURCE_ITEMS,
  LOADED_RESOURCE_ITEMS_TYPES,
  SET_LOADING,
  UPDATED_RESOURCE_ITEM,
} from '../actions/resource.action';
export interface ItemState {
  resources: Resource[];
  selectedResource: Resource | null;
  resourceItems: ResourceItem[] | null;
  selectedResourceItem: ResourceItem | null;
  resourceItemTypes: ResourceItemType[];
  isLoading: boolean;
  error: string;
}
const initialState: ItemState = {
  resources: [],
  selectedResource: null,
  resourceItems: [],
  selectedResourceItem: null,
  resourceItemTypes: [],
  isLoading: false,
  error: '',
};


export function reducer(
  state: ItemState = initialState,
  action: any
): ItemState {
  switch (action.type) {
    case SET_LOADING: {
      const { isLoading } = action;
      // console.log(`Reducer: Setting isLoading to ${isLoading}`);
      return { ...state, isLoading, error: '' };
    }
    case LOADED_RESOURCES: {
      const { resources } = action;
      // console.log(
      //   `Reducer: Setting loaded resources (${resources.length}) items`
      // );
      return { ...state, resources, isLoading: false, error: '' };
    }
    case LOADED_RESOURCE: {
      const { resource } = action;
      // console.log(`Reducer: Setting loaded resource ${resource?.id}`);
      return { ...state, selectedResource: resource, error: '' };
    }
    case LOADED_RESOURCE_ITEMS: {
      const { resourceItems } = action;
      // console.log(
      //   `Reducer: Setting loaded resource items (${resourceItems.length}) items`
      // );
      return { ...state, resourceItems, isLoading: false, error: '' };
    }
    case LOADED_RESOURCE_ITEM: {
      const { resourceItem } = action;
      // console.log(`Reducer: Setting loaded resource item ${resourceItem?._id}`);
      return { ...state, selectedResourceItem: resourceItem, error: '' };
    }
    case LOADED_RESOURCE_ITEMS_TYPES: {
      const { resourceItemTypes } = action;
      // console.log(
      //   `Reducer: Setting loaded resource item types (${resourceItemTypes.length}) items`
      // );
      return { ...state, resourceItemTypes, isLoading: false, error: '' };
    }
    case ADDED_RESOURCE_ITEM: {
      const { savedResourceItem } = action;
      // console.log('Reducer: Adding resource item:',  savedResourceItem);

      const resourceItems = [...state.resourceItems, savedResourceItem];
      return { ...state, resourceItems, error: '' };
    }
    case UPDATED_RESOURCE_ITEM: {
      const {  savedResourceItem } = action;
      // console.log('Reducer: Updating resource item:', savedResourceItem);
      const resourceItems = state.resourceItems.map((currItem) =>
        currItem._id === savedResourceItem._id
          ? savedResourceItem
          : currItem
      );
      return { ...state, resourceItems, error: '' };
    }
    default:
      return state;
  }
}
