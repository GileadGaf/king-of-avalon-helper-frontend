import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from 'src/app/models/resource';
import { User } from 'src/app/models/user';
import { LoadResource, LoadResources } from 'src/app/store/actions/resource.action';
import { LoadUser, SignOutUser } from 'src/app/store/actions/user.action';
import { State } from 'src/app/store/store';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  public resources$: Observable<Resource[]>;
  public loggedInUser$: Observable<User> | null;
  public loggedInUser: User | null;
  private userSubscription: Subscription;
  private routerSubscription:Subscription;
  constructor(private router: Router, private store: Store<State>) {
    this.loggedInUser$ = this.store.select('userState').pipe(map(userState => userState?.loggedInUser));
    this.resources$ = this.store.select('resourceState').pipe(map(resourceState => resourceState.resources));
   }

  ngOnInit(): void {
    this.store.dispatch(new LoadResources());
    this.store.dispatch(new LoadUser());
    this.userSubscription=this.loggedInUser$.subscribe(loggedInUser=>{
      this.loggedInUser=loggedInUser;
    })
  // this.routerSubscription=this.router.events.subscribe(console.log)
  }

  public onSignOut() {
    this.store.dispatch(new SignOutUser());
    this.router.navigateByUrl('/');
  } 
  public get userResourcesAmount() {
    return this.loggedInUser.resourceAmount;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.userSubscription.unsubscribe();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    
  }

}
