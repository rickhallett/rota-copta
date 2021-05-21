import { Injectable, OnInit } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Role, User } from "./models";
import { RolesService } from "./roles.service";
import { UsersService } from "./users.service";

@Injectable()
export class SharedDataService implements OnInit {
  private users: User[];
  private roles: Role[];

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService
  ) {
    this.usersService
      .getUsers()
      .subscribe((data: User[]) => (this.users = data));

    this.rolesService
      .getRoles()
      .subscribe((data: Role[]) => (this.roles = data));
  }

  ngOnInit() { // do services even use this hook? It would appear no...
    console.log('dataService init')
  }

  // TODO: this approach ends up calling getRoleUsers 30x on page load (presumably a result of returning a new data structure to the view, which causes some cascade of lifecycle hook execution)
  getRoleUsers(roleId: number): User[] {
    if (!this.roles) return null;

    const filteredUsers = this.users.filter((user) => {
      return user.roles ? user.roles.includes(roleId) : false;
    });

    return filteredUsers;
  }

  getRoleColour(roleId: number): string {
    if (this.roles) {
      return this.roles.find((role) => role.id === roleId).colour;
    }
  }

  getRoleName(roleId: number): string {
    if (this.roles) {
      return this.roles.find((role) => role.id === roleId).name;
    }
  }

  getRoles(): Role[] {
    return this.roles;
  }

  getUsers(): Observable<User[]> {
    if (!this.users) {
      console.log('no users in dataService.users; fetching users...')
      return this.usersService.getUsers();
    }

    console.log("users in dataService.users; returning users");
    return of(this.users);
  }

  updateUserName(newName, userId) {
    this.users = this.users.map(user => {
      if (user.id === userId) {
        user.name = newName;
      }

      return user;
    });
  }
}
