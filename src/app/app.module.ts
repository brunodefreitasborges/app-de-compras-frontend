import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroceryItemComponent } from './components/grocery-item/grocery-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppStore } from './store/app.store';
import { NetworkInterceptor } from './services/network.interceptor';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { HomeComponent } from './home/home.component';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { AddListDialogComponent } from './components/add-list-dialog/add-list-dialog.component';

import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
      keycloak.init({
          config: {
              realm: 'groceries',
              url: 'http://localhost:8080',
              clientId: 'grocery-app'
          },
          initOptions: {
              onLoad: 'check-sso',
              silentCheckSsoRedirectUri:
                  window.location.origin + '/assets/silent-check-sso.html'
          }
      });
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GroceryItemComponent,
    DialogFormComponent,
    HomeComponent,
    GroceryListComponent,
    AddListDialogComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    AppStore,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
