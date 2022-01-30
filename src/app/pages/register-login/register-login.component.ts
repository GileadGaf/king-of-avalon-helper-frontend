import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/user.service';
import { LoadUser, LoadUsers, RegisterUser, SignInUser } from 'src/app/store/actions/user.action';
import { State } from 'src/app/store/store';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss'],
})
export class RegisterLoginComponent implements OnInit {
  public isRegisterSectionVisible = true;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;
  public users$: Observable<User[]>;
  public user: User = this.userService.getEmptyUser();
  constructor(private userService: UserService, private resourceService: ResourceService, private router: Router,private store:Store<State>) {
    this.users$ = this.store.select('userState').pipe(map(userState=>userState.users));
    this.isLoading$ = this.store.select('userState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('userState').pipe(pluck('error'));
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());  
  }

  public onChangeSectionTab() {
    this.isRegisterSectionVisible = !this.isRegisterSectionVisible;
  }

  public onRegisterUser() {
    
    if (!(this.user.username && this.user.password)) return;
    //TODO: ERROR message
    this.store.dispatch(new RegisterUser(this.user))

    this.router.navigateByUrl('/');

  }

  public onSignInUser({value}) {
    this.user.username = value.usersSelect;
    this.store.dispatch(new SignInUser(this.user.username,this.user.password));
    // //TODO: ERROR message
    this.router.navigateByUrl('/');
  }
}
