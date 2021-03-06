import { Component, OnChanges, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/models";
import { DataStore } from "src/app/services/data-store.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit, OnChanges {
  constructor(private dataStoreService: DataStore) {}

  ngOnInit() {}

  ngOnChanges() {}

  getRoleName(roleId: number): string {
    return this.dataStoreService.getRoleName(roleId);
  }

  getRoleColour(roleId: number): string {
    return this.dataStoreService.getRoleColour(roleId);
  }

  onNameInput(event: any, userId: number): void {
    this.dataStoreService.updateUserName(event.target.value, userId);
  }

  getUserRoles(user: User) {
    return this.dataStoreService.getUserRoles(user);
  }

  get users$(): Observable<User[]> {
    return this.dataStoreService.users$;
  }
}
