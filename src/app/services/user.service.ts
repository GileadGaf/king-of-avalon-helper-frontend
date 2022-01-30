import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { LoadingUsers } from '../store/actions/user.action';
import { UserState } from '../store/reducers/user.reducer';
import { ResourceService } from './resource.service';
import { UtilitiesService } from './utilities.service';

const LOGGEDIN_USER_KEY = 'loggedinUser';
const USERS_KEY = 'usersDb';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();
  private _usersDb :User[];
  private _loggedinUser: User;
  private _loggedinUser$ = new BehaviorSubject<User>(null);
  public loggedinUser$ = this._loggedinUser$.asObservable();
  constructor(private utilitiesService: UtilitiesService,private store:Store<UserState>) { }
  
  public get loggedinUser():Observable<User> {
    const user = this._loggedinUser || this.utilitiesService.getFromStorage(LOGGEDIN_USER_KEY) as User;
    return of(user);
  }
  public getUsers(): Observable<User[]>{
    this.store.dispatch(new LoadingUsers());
    let users = (this.utilitiesService.getFromStorage(USERS_KEY) || []) as User[];
    if (!users || !users.length) {
      users = this._createUsers();
      this.utilitiesService.saveToStorage(USERS_KEY, users);
    }
    this._usersDb = [...users];
    return  of(users);
    // return new Observable((observer) => observer.next(users));
  }


  public register(user): Observable<User> {
    const newUser = { ...user } as User;
    newUser._id = this.utilitiesService.makeid();
    this._usersDb.push(newUser);
    this.utilitiesService.saveToStorage(USERS_KEY, this._usersDb);
    const { username, password } = newUser;
   return this.signIn(username,password);
    
  }
  public signIn(username,password):Observable<User> {
    const requestingUser = this.getMatchedUser({ username, password });
    if (!requestingUser) {
      return throwError('user info not match');
    }
    this._loggedinUser = requestingUser;
      this.utilitiesService.saveToStorage(LOGGEDIN_USER_KEY, this._loggedinUser);
      return of(this._loggedinUser);
    
  }
  public getMatchedUser({ username, password }):User {
    const selectedUser = this._usersDb.find(user => user.username === username && user.password === password);
    return selectedUser;
    
  }
  public signOut():Observable<User> {
    this._loggedinUser = null;
    this.utilitiesService.saveToStorage(LOGGEDIN_USER_KEY, null);
    return of(null);
  }

  public addResourceToUser(resourceTypeId, resourceAmount):Observable<User> {
    const resourceTypeKey = {
      1: 'food',
      2: 'wood',
      3: 'iron',
      4: 'silver'
    };
    const modifiedUser = this._loggedInUser;
    modifiedUser.resourceAmount[resourceTypeKey[resourceTypeId]] = resourceAmount;
    this.utilitiesService.saveToStorage(LOGGEDIN_USER_KEY, modifiedUser);
    this._saveModifiedUserInUsersDb(modifiedUser);
    return of({...modifiedUser});
  }


  public getEmptyUser(username ='') {
    return new User('', username, '12345');
  }

  private get _loggedInUser() {
    return this.utilitiesService.getFromStorage(LOGGEDIN_USER_KEY) as User;
  }

  private _saveModifiedUserInUsersDb(user: User) {
    let users = this.utilitiesService.getFromStorage(USERS_KEY) as User[];
    users = users.map(currUser => (currUser._id === user._id) ? user : currUser);
    this.utilitiesService.saveToStorage(USERS_KEY, users);

  }


  private _createUsers():User[]{
    return ['ghost', 'johnny', 'carter', 'noble']
      .map(username => ({ ...this.getEmptyUser(username),_id: this.utilitiesService.makeid() }));
  }


}
