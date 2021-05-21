import { Component, OnInit } from '@angular/core';
import { Role, User } from 'src/app/services/models';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.css"],
})
export class RolesComponent implements OnInit {
  public users: User[];
  public roles: Role[];

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    // TODO: this data will need to be lifted to app.component.ts level so that both roles.component.ts and users.component.ts can update state
    this.usersService
      .getUsers()
      .subscribe((data: User[]) => (this.users = data));

    this.rolesService
      .getRoles()
      .subscribe((data: Role[]) => (this.roles = data));

    setTimeout(() => {
      console.log("users", this.users);
      console.log("roles", this.roles);
    }, 1000);
  }

  getRoleUsers(roleId: number): User[] {
    if (!this.roles) return null;

    const filteredUsers = this.users.filter((user) => {
      
      return user.roles ? user.roles.includes(roleId) : false;
    })

    console.log('filteredUsers', filteredUsers);
    return filteredUsers;
  }

  getRoleColour(roleId: number): string {
    if (this.roles) {
      return this.roles.find((role) => role.id === roleId).colour;
    }
  }
}
