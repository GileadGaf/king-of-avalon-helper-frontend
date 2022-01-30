import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './gaurds/authentication.guard';
import { AdminSectionComponent } from './pages/admin-section/admin-section.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterLoginComponent } from './pages/register-login/register-login.component';
import { ResourceDetailsComponent } from './pages/resource-details/resource-details.component';
import { ResourceItemEditComponent } from './pages/resource-item-edit/resource-item-edit.component';
import { ResourceItemResolverService } from './services/resource-item-resolver.service';
const routes: Routes = [
  {
    path: 'resource/:id',
    component: ResourceDetailsComponent,
    canActivate:[AuthenticationGuard]
    
  },
  {
    path: 'edit/:typeId/:id',
    component: ResourceItemEditComponent,
    canActivate:[AuthenticationGuard],
    resolve:{resourceItem:ResourceItemResolverService}
  },
  {
    path: 'edit/:typeId',
    component: ResourceItemEditComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'user',
    component: RegisterLoginComponent,
  },
  {
    path: 'admin',
    component: AdminSectionComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
