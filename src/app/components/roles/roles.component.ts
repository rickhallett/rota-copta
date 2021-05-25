import { Component, OnInit } from "@angular/core";
import { DataStore } from "src/app/services/data-store.service";
import { User } from "src/app/models/models";

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

  get roles$() {
    return this.dataStoreService.roles$;
  }
}
