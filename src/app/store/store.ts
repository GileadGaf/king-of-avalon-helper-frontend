import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as resourceModule from './reducers/resource.reducer';
import * as UserModule from './reducers/user.reducer';

import { environment } from '../../environments/environment';

export interface State {
    resourceState: resourceModule.ItemState;
    userState: UserModule.UserState;
}

export const reducers: ActionReducerMap<State> = {
  resourceState: resourceModule.reducer,
  userState: UserModule.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
