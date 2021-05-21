import { Component, OnChanges, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { Role, User } from 'src/app/services/models';
import { DataStore } from 'src/app/services/data-store.service';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit, OnChanges {
  constructor(private dataStoreService: DataStore) {}

  ngOnInit() {

  }

  ngOnChanges() {

  }

  get $users() {
    return this.dataStoreService.$users;
  }

  getRoleName(roleId: number): string {
    return this.dataStoreService.getRoleName(roleId);
  }

  getRoleColour(roleId: number): string {
    return this.dataStoreService.getRoleColour(roleId);
  }

  onNameInput(event: any, userId: number) {
    this.dataStoreService.updateUserName(event.target.value, userId);
  }
}
