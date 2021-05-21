import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Role, User } from "./models";
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

  // TODO: this approach ends up calling getRoleUsers 30x on page load (presumably a result of returning a new data structure to the view, which causes some cascade of lifecycle hook execution)
  getRoleUsers(roleId: number): User[] {
    return this._users
      .getValue()
      .filter((user) => (user.roles ? user.roles.includes(roleId) : false));
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
    // this.users = this.users.map((user) => {
    //   if (user.id === userId) {
    //     user.name = newName;
    //   }

    //   return user;
    // });
  }
}
