import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Role, User } from "../models/models";
import { RolesService } from "./roles.service";
import { UsersService } from "./users.service";

@Injectable()
export class DataStore {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _roles: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);

  public readonly $users: Observable<User[]> = this._users.asObservable();
  public readonly $roles: Observable<Role[]> = this._roles.asObservable();

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService
  ) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.usersService.getUsers().subscribe((data) => this._users.next(data));
    this.rolesService.getRoles().subscribe((data) => this._roles.next(data));
  }

  // TODO: this approach ends up calling getRoleUsers 30x on page load (presumably a result of returning a new data structure to the view, 
  // which causes some cascade of lifecycle hook execution)
  // SOLUTION: map the data prior to request from template
  getRoleUsers(roleId: number): User[] {
    return this._users
      .getValue()
      .filter((user) => (user.roles ? user.roles.includes(roleId) : false));
  }

  getUserRoles(user: User) {
    if (!user.roles) return null;
    
    // const userRoles = [];

    // user.roles.forEach(roleId => {
    //   userRoles.push(this._roles.getValue().find(r => r.id === roleId))
    // });

    return user.roles
      .map((roleId) => this._roles.getValue().find((r) => r.id === roleId))
      .sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  getRoleColour(roleId: number): string {
    const role = this._roles.getValue().find((role) => role.id === roleId);
    return role ? role.colour : null;
  }

  getRoleName(roleId: number): string {
    const role = this._roles.getValue().find((role) => role.id === roleId);
    return role ? role.name : null;
  }

  updateUserName(newName, userId) {
    this._users.next(this._users.getValue().map((user) => {
      if (user.id === userId) {
        user.name = newName;
      }

      return user;
    }));
  }
}
