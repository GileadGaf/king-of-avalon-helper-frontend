import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { observable, of } from 'rxjs';
import { map, catchError, switchMap, tap, concatMap } from 'rxjs/operators';
import { ResourceService } from '../services/resource.service';
import { UserService } from '../services/user.service';
import { ADDED_RESOURCE_ITEM, LoadedResources, LOADED_RESOURCE, LOADED_RESOURCES, LOADED_RESOURCE_ITEMS, LOADED_RESOURCE_ITEMS_TYPES, LOAD_RESOURCE, LOAD_RESOURCES, LOAD_RESOURCE_ITEMS, LOAD_RESOURCE_ITEM_TYPES, resourceAction, SAVE_RESOURCE_ITEM, UPDATED_RESOURCE_ITEM } from './actions/resource.action';
import { LOADED_USER, LOADED_USERS, LOAD_USER, LOAD_USERS, REGISTER_USER, SET_ERROR, SIGN_IN_USER, SIGN_OUT_USER, UPDATE_USER_RESOURCE_AMOUNT, userAction } from './actions/user.action';
@Injectable()
export class AppEffects {
  constructor(
    private userActions$: Actions<userAction>,
    private resourceActions$: Actions<resourceAction>,
    private userService: UserService,
    private resourcesService:ResourceService
  ) { }

  /* USERS EFFECTS */
  loadUsers$ = createEffect(() => {
    return this.userActions$.pipe(
      ofType(LOAD_USERS),
      // tap(() => console.log('Effects: load items ==> service')),
      concatMap(() =>
        this.userService.getUsers().pipe(
          // tap(() => console.log('Effects: Got users from service, send it to ===> Reducer')),
          map((users) => ({
            type: LOADED_USERS,
            users,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    );
  });
  loadUser$ = createEffect(() => {
    return this.userActions$.pipe(
      ofType(LOAD_USER),
      // tap(() => console.log('Effects: load user ==> service')),
      switchMap(() =>
        this.userService.loggedinUser.pipe(
          // tap(() => console.log('Effects: Got user from service ===> Reducer')),
          map((user) => ({
            type: LOADED_USER,
            user
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });
  registerUser$ = createEffect(() => {
    return this.userActions$.pipe(
      ofType(REGISTER_USER),
      // tap(() => console.log('Effects: register user ==> service')),
      switchMap(({user}) =>
        this.userService.register(user).pipe(
          // tap(() => console.log('Effects: Got user from service ===> Reducer')),
          map((user) => ({
            type: LOADED_USER,
            user
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });
  signInUser$ = createEffect(() => {
    return this.userActions$.pipe(
      ofType(SIGN_IN_USER),
      // tap(() => console.log('Effects: sign user ==> service')),
      switchMap(({username,password}) =>
        this.userService.signIn(username,password).pipe(
          // tap(() => console.log('Effects: Got user from service ===> Reducer')),
          map((user) => ({
            type: LOADED_USER,
            user
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });
  signOutUser$ = createEffect(() => {
    return this.userActions$.pipe(
      ofType(SIGN_OUT_USER),
      // tap(() => console.log('Effects: sign user out ==> service')),
      switchMap(() =>
        this.userService.signOut().pipe(
          // tap(() => console.log('Effects: Got user from service ===> Reducer')),
          map((user) => ({
            type: LOADED_USER,
            user
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });

  updateUserResource$ = createEffect(() => {
    return this.userActions$.pipe(
      ofType(UPDATE_USER_RESOURCE_AMOUNT),
      switchMap(({resourceTypeId,resourceAmount}) =>
      this.userService.addResourceToUser(resourceTypeId,resourceAmount).pipe(
          tap((user) => console.log(user)),
          map((user) => ({
            type: LOADED_USER,
            user
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });

  /* RESOURCES EFFECTS */
  loadResources$ = createEffect(() => {
    return this.resourceActions$.pipe(
      ofType(LOAD_RESOURCES),
      // tap(() => console.log('Effects: load resources ==> service')),
      switchMap(() =>
        this.resourcesService.getResources().pipe(
          // tap(() => console.log('Effects: Got resources from service, send it to ===> Reducer')),
          map((resources) => ({
            type: LOADED_RESOURCES,
            resources,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    );
  });
  loadResource$ = createEffect(() => {
    return this.resourceActions$.pipe(
      ofType(LOAD_RESOURCE),
      // tap(() => console.log('Effects: load resource ==> service')),
      switchMap((action) =>
        this.resourcesService.getResourceByTypeId(action.typeId).pipe(
          // tap(() => console.log('Effects: Got resource from service ===> Reducer')),
          map((resource) => ({
            type: LOADED_RESOURCE,
            resource
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });
  loadResourceItems$ = createEffect(() => {
    return this.resourceActions$.pipe(
      ofType(LOAD_RESOURCE_ITEMS),
      // tap(() => console.log('Effects: load resources items ==> service')),
      switchMap(({userId,resourceTypeId}) =>
        this.resourcesService.getResourceItems(userId,resourceTypeId).pipe(
          // tap(() => console.log('Effects: Got resource items from service, send it to ===> Reducer')),
          map((resourceItems) => ({
            type: LOADED_RESOURCE_ITEMS,
            resourceItems,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    );
  });
  loadResourceItemTypes$ = createEffect(() => {
    return this.resourceActions$.pipe(
      ofType(LOAD_RESOURCE_ITEM_TYPES),
      // tap(() => console.log('Effects: load resources item types==> service')),
      switchMap(({resourceTypeId}) =>
        this.resourcesService.getResourceItemTypesByTypeId(resourceTypeId).pipe(
          // tap(() => console.log('Effects: Got resource item types from service, send it to ===> Reducer')),
          map((resourceItemTypes) => ({
            type: LOADED_RESOURCE_ITEMS_TYPES,
            resourceItemTypes,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    );
  });
  saveResourceItem$ = createEffect(() => {
    return this.resourceActions$.pipe(
      ofType(SAVE_RESOURCE_ITEM),
      switchMap((action) =>
        this.resourcesService.saveResourceItem(action.resourceItem).pipe(
          // tap(() => console.log('Effects: resource item saved by service, inform the ===> Reducer')),
          map(([isNew,savedResourceItem]) => ({
            type: (isNew) ? ADDED_RESOURCE_ITEM : UPDATED_RESOURCE_ITEM,
            savedResourceItem,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })

        )
      )
    );
  })

}

