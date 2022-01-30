import { createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user';
import {
  LOADED_USER,
  LOADED_USERS,
  REGISTER_USER,
  SET_ERROR,
  SET_LOADING,
} from '../actions/user.action';

export  interface UserState {
  users: User[];
  loggedInUser: User | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
  isLoading: false,
  error: '',
};


// export const loggedInUser = createSelector()
export function reducer(
  state: UserState = initialState,
  action: any
): UserState {
  switch (action.type) {
    case SET_LOADING: {
      const { isLoading } = action;
      // console.log(`Reducer: Setting isLoading to ${isLoading}`);
      return { ...state, isLoading, error: '' };
    }
    case SET_ERROR: {
      const { error } = action;
      // console.log(`Reducer: Setting item error`, error);
      return { ...state, error, isLoading: false };
    }
    case LOADED_USERS: {
      const { users } = action;
      // console.log(`Reducer: Setting loaded users (${users.length}) items`);
      return { ...state, users, isLoading: false, error: '' };
    }
    case LOADED_USER: {
      const { user } = action;
      // console.log('action', action.user);
      // console.log(`Reducer: Setting loaded user ${user?._id}`);
      return { ...state, loggedInUser: user, error: '' };
    }
    case REGISTER_USER: {
      const { user } = action;
      // console.log('Reducer: Adding user:', user);
      const users = [...state.users, user];
      return { ...state, users, error: '' };
    }

    // } case REMOVED_ITEM: {
    //   const { itemId } = action;
    //   console.log('Reducer: Removing item:', itemId);
    //   const items = state.items.filter(item => item.id !== itemId)
    //   return { ...state, items, error: '' };

    // } case UPDATED_ITEM: {
    //   const { item } = action;
    //   console.log('Reducer: Updating item:', item);
    //   const items = state.items.map(currItem => (currItem.id === item.id) ? item : currItem)
    //   return { ...state, items, item: null, error: '' };
    default:
      return state;
  }
}
