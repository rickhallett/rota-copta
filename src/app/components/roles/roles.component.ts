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
  constructor() {}

  ngOnInit() {}

  // TODO: this approach ends up calling getRoleUsers 30x on page load (presumably a result of returning a new data structure to the view, which causes some cascade of lifecycle hook execution)
  getRoleUsers(roleId: number): User[] {
    return null;
  }

  getRoleColour(roleId: number): string {
    return null;
  }
}
