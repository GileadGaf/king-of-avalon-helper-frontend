import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AppFooterComponent } from './cmps/app-footer/app-footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ResourceListComponent } from './cmps/resource-list/resource-list.component';
import { ResourcePreviewComponent } from './cmps/resource-preview/resource-preview.component';
import { ResourceDetailsComponent } from './pages/resource-details/resource-details.component';
import { ResourceItemListComponent } from './cmps/resource-item-list/resource-item-list.component';
import { ResourceItemPreviewComponent } from './cmps/resource-item-preview/resource-item-preview.component';
import { ResourceItemEditComponent } from './pages/resource-item-edit/resource-item-edit.component';
import { RegisterLoginComponent } from './pages/register-login/register-login.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './store/store';
import { AppEffects } from './store/app.effects';
import { environment } from '../environments/environment';
import { AdminSectionComponent } from './pages/admin-section/admin-section.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    HomeComponent,
    ResourceListComponent,
    ResourcePreviewComponent,
    ResourceDetailsComponent,
    ResourceItemListComponent,
    ResourceItemPreviewComponent,
    ResourceItemEditComponent,
    RegisterLoginComponent,
    AdminSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
