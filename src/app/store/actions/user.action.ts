import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';


export const SET_LOADING = '[user] loading';
export const SET_ERROR = '[user] error';
export const LOAD_USERS = '[user]s load';
export const LOAD_USER = '[user] load';
export const LOADED_USER = '[user] loaded';
export const LOADED_USERS = '[user]s loaded';
export const SAVE_USER = '[user] saved';
export const REGISTER_USER = '[user] added';
export const SIGN_IN_USER = '[user] signed in';
export const SIGN_OUT_USER = '[user] signed out';
export const UPDATE_USER_RESOURCE_AMOUNT = '[user] resource amount updated';

export type userAction = LoadUsers | LoadUser  | RegisterUser |SignInUser | SignOutUser| UpdateUserResourceAmount;

export class LoadUsers implements Action {
    readonly type = LOAD_USERS;
    constructor() {}
}
  
export class LoadUser implements Action {
    readonly type = LOAD_USER;
    constructor(public userId: string = '') {}
}
  
//Register|| update
export class SaveUser implements Action {
    readonly type = SAVE_USER;
    constructor(public user: User) {}
}
export class LoadingUsers implements Action {
    readonly type = SET_LOADING;
    constructor(public isLoading: boolean = true) {}
}
export class LoadedUsers implements Action {
    readonly type = LOADED_USERS;
    constructor(public users: User[] = []) {}
  }
  export class LoadedUser implements Action {
    readonly type = LOADED_USER;
    constructor(public user: User) {}
}
  export class RegisterUser implements Action {
    readonly type = REGISTER_USER;
    constructor(public user) {}
}
  export class SignInUser implements Action {
    readonly type = SIGN_IN_USER;
    constructor(public username,public password) {}
}
  export class SignOutUser implements Action {
    readonly type = SIGN_OUT_USER;
    constructor() {}
}
  export class UpdateUserResourceAmount implements Action {
    readonly type = UPDATE_USER_RESOURCE_AMOUNT;
    constructor(public resourceTypeId:number,public resourceAmount:number) {}
}


  
export class UserError implements Action {
    readonly type = SET_ERROR;
    constructor(public error: string) {}
  }