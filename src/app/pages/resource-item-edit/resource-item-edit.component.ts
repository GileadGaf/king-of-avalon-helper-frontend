import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResourceItem } from 'src/app/models/resource-item';
import { ResourceItemType } from 'src/app/models/resource-item-type';
import { User } from 'src/app/models/user';
import { ResourceService } from 'src/app/services/resource.service';
import { LoadResourceItemTypes, SaveResourceItem } from 'src/app/store/actions/resource.action';
import { State } from 'src/app/store/store';

@Component({
  selector: 'app-resource-item-edit',
  templateUrl: './resource-item-edit.component.html',
  styleUrls: ['./resource-item-edit.component.scss'],
})
export class ResourceItemEditComponent implements OnInit {
  private resourceitemTypesSubscription: Subscription;
  private routeSubscription: Subscription;
  private userSubscription$: Subscription;
  public resourceItemTypes$: Observable<ResourceItemType[]>;
  private loggedInUser$: Observable<User>;
  private loggedInUser: User;
  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) {
    this.resourceItemTypes$ = this.store
      .select('resourceState')
      .pipe(map((resourceState) => resourceState.resourceItemTypes));
    this.loggedInUser$ = this.store
      .select('userState')
      .pipe(map((userState) => userState.loggedInUser));
  }
  public savedResourceItem: ResourceItem;
  ngOnInit(): void {
    let { typeId: resourceTypeId } = this.route.snapshot.params;
    resourceTypeId = +resourceTypeId;
    this.store.dispatch(new LoadResourceItemTypes(resourceTypeId));
    let resourceItemAmount = 0;
    this.resourceitemTypesSubscription = this.resourceItemTypes$.subscribe(
      (resourceItemTypes) => {
        resourceItemAmount = resourceItemTypes[0].amount;
      }
    );
    this.userSubscription$ = this.loggedInUser$.subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
    });
    if (!this.loggedInUser) this.router.navigateByUrl('/');
    this.routeSubscription = this.route.data.subscribe((data) => {
      this.savedResourceItem =
        data.resourceItem ||
        this.resourceService.getEmptyResourceItem(
          resourceTypeId,
          resourceItemAmount,
          this.loggedInUser._id
        );
    });
  }

  public onChangeResourceType({ value: resourceTypeId }) {
    this.store.dispatch(new LoadResourceItemTypes(+resourceTypeId));
  }
  public onChangeResourceItemType({ target }) {
    this.savedResourceItem.amount = +target.value;
  }
  public onSaveResourceItem() {
    this.store.dispatch(new SaveResourceItem({...this.savedResourceItem}));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.resourceitemTypesSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.userSubscription$.unsubscribe();
  }
}
