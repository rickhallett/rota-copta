import { Component, OnInit } from '@angular/core';

import { User } from '../../models/models';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe((data: User[]) => this.users = data);

    setTimeout(() => {
      console.log(this.users)      
    }, 2000);

  }

  // TODO: role name is dynamic depending on what comes back from role endpoint
  getRoleName(role: number): string {
    return 'High Roller';
  }

  // TODO: role colour is dynamic depending on what comes back from role endpoint
  getRoleColour(role: number): string {
    return '#e88abb';
  }

}
