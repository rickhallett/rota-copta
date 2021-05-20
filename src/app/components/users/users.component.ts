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

}
