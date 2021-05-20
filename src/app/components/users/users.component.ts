import { Component, OnInit } from "@angular/core";

import { Role, User } from "../../services/models";
import { UsersService } from "../../services/users.service";
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  public users: User[];
  public roles: Role[];

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    this.usersService
      .getUsers()
      .subscribe((data: User[]) => (this.users = data));

    this.rolesService
      .getRoles()
      .subscribe((data: Role[]) => (this.roles = data));

    setTimeout(() => {
      console.log('users', this.users);
      console.log('roles', this.roles);
    }, 1000);
  }

  getRoleName(roleId: number): string {
    if (this.roles) {
      return this.roles.find((role) => role.id === roleId).name;
    }
  }

  getRoleColour(roleId: number): string {
    if (this.roles) {
      return this.roles.find((role) => role.id === roleId).colour;
    }
  }
}
