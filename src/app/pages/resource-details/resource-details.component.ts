import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from 'src/app/models/resource';
import { ResourceItem } from 'src/app/models/resource-item';
import { User } from 'src/app/models/user';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/user.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { LoadResource, LoadResourceItems } from 'src/app/store/actions/resource.action';
import { State } from 'src/app/store/store';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss'],
})
export class ResourceDetailsComponent implements OnInit {
  public routeSubscription: Subscription;
  public resourceItems$: Observable<ResourceItem[]>;
  public resource$: Observable<Resource>;
  public resource: Resource;
  public loggedInUser$: Observable<User>;
  public loggedInUser:User;
  private resourcesSubscription: Subscription;
  private userSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private store:Store<State>,
    private utilitiesService: UtilitiesService,
  ) {
    this.resource$ = this.store.select('resourceState').pipe(map(resourceState => resourceState.selectedResource));
    this.resourceItems$ = this.store.select('resourceState').pipe(map(resourceState => resourceState.resourceItems));
    this.loggedInUser$ = this.store.select('userState').pipe(map(userState => userState.loggedInUser));
  }

  ngOnInit(): void {
    this.userSubscription = this.loggedInUser$.subscribe(loggedInUser => {
      this.loggedInUser = loggedInUser;
    })


    if (!this.loggedInUser) {
      this.router.navigateByUrl('/');
      return;
    }
    let resourceTypeId;
    this.routeSubscription = this.route.params.subscribe(({ id }) => {
      resourceTypeId = +id;
      this.store.dispatch(new LoadResource(resourceTypeId));
      this.store.dispatch(new LoadResourceItems(this.loggedInUser._id,resourceTypeId));
    })
    this.resourcesSubscription = this.resource$.subscribe(resource => {
      this.resource = resource;
    })
  }
  public  get styledResourceAmountDisplay() {
    const resourceTypeKey = {
      1: 'food',
      2: 'wood',
      3: 'iron',
      4: 'silver'
    };
    const resourceAmount = this.loggedInUser.resourceAmount[resourceTypeKey[this.resource.id]];
    return this.utilitiesService.getVisualDisplay(resourceAmount);
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
   if (this.routeSubscription) {
    this.routeSubscription.unsubscribe();
   }
   if (this.resourcesSubscription) {
    this.resourcesSubscription.unsubscribe();
   }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    
  }
}
