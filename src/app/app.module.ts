import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { HomeComponent } from './home/home.component';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RolesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UsersService, RolesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
