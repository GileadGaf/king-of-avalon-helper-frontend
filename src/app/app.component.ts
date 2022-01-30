import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ResourceService } from './services/resource.service';
import { UserService } from './services/user.service';
import {  LoadResourceItems,  LoadResources } from './store/actions/resource.action';
import { State } from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'king-of-avalon';
  constructor(private store:Store<State>) {
    
  }
  ngOnInit(): void {
  
 
    
    // this.store.dispatch(new LoadResourceItems())
    // this.resourceService.loadResources();
    // this.userService.loadUsers();
    // this.userService.signIn(this.userService.loggedinUser);
      //  if(this.userService.loggedinUser)  this.resourceService.loadResourceItems();


    
  }
}
