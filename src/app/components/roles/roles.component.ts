import { Component, OnInit } from "@angular/core";
import { DataStore } from "src/app/services/data-store.service";
import { Role, User } from "src/app/models/models";
import { Observable } from "rxjs";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.css"],
})
export class RolesComponent implements OnInit {
  constructor(private dataStoreService: DataStore) {}

  ngOnInit() {}

  getRoleUsers(roleId: number): User[] {
    return this.dataStoreService.getRoleUsers(roleId);
  }

  getRoleColour(roleId: number): string {
    return this.dataStoreService.getRoleColour(roleId);
  }

  onNameInput(event: any, role: Role): void {
    this.dataStoreService.updateRoleName(event.target.value, role);
  }

  get roles$(): Observable<Role[]> {
    return this.dataStoreService.roles$;
  }
}
