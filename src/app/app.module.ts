import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersComponent } from "./components/users/users.component";
import { RolesComponent } from "./components/roles/roles.component";
import { HomeComponent } from "./components/home/home.component";
import { UsersService } from "./services/users.service";
import { RolesService } from "./services/roles.service";
import { DataStore } from "./services/data-store.service";
import { HttpErrorService } from "./services/http-error.service";

@NgModule({
  declarations: [AppComponent, UsersComponent, RolesComponent, HomeComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [UsersService, RolesService, DataStore, HttpErrorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
