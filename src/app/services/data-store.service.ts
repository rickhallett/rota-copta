import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";
import { Role, User } from "../models/models";
import { RolesService } from "./roles.service";
import { UsersService } from "./users.service";

@Injectable()
export class DataStore {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _roles: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);

  public users$: Observable<User[]> = this._users.asObservable();
  public roles$: Observable<Role[]> = this._roles.asObservable();

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService
  ) {
    this.loadInitialData();
    this.sortUsersByName();
    this.sortRolesByName();
  }

  loadInitialData() {
    this.usersService.getUsers().subscribe(
      (data) => this._users.next(data),
      (error) => alert(`Could not retrieve users! ${error}`)
    );
    this.rolesService.getRoles().subscribe(
      (data) => this._roles.next(data),
      (error) => alert(`Could not retrieve roles! ${error}`)
    );
  }

  sortUsersByName() {
    console.log(this.users$);
    this.users$ = this.users$.pipe(
      map((user) => {
        user.sort((a, b) => (a.name < b.name ? -1 : 1));
        return user;
      })
    );
    console.log(this.users$);
  }

  sortRolesByName() {
    this.roles$ = this.roles$.pipe(
      map((role) => {
        role.sort((a, b) => (a.name < b.name ? -1 : 1));
        return role;
      })
    );
  }

  // TODO: this approach ends up calling getRoleUsers 30x on page load (presumably a result of returning a new data structure to the view,
  // which causes some cascade of lifecycle hook execution)
  // SOLUTION: map the data prior to request from template
  getRoleUsers(roleId: number): User[] {
    return this._users
      .getValue()
      .filter((user) => (user.roles ? user.roles.includes(roleId) : false))
      .sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  getUserRoles(user: User): Role[] {
    if (!user.roles) return null;

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

  updateUserName(newName, userId): void {
    this._users.next(
      this._users.getValue().map((user) => {
        if (user.id === userId) {
          user.name = newName;
        }

        return user;
      })
    );
  }

  updateRoleName(newRoleName: string, role: Role): void {
    console.log("updateRoleName", newRoleName, role);
    this._roles.next(
      this._roles.getValue().map((r) => {
        if (r.id === role.id) {
          r.name = newRoleName;
        }

        console.log(r);

        return r;
      })
    );
  }
}
