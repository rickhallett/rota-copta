import { Component, OnChanges, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Role, User } from 'src/app/services/models';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit, OnChanges {
  public roles: Role[];
  public $users: Observable<User[]>;

  constructor(private dataService: SharedDataService) {}

  ngOnInit() {
    this.roles = this.dataService.getRoles();
    this.$users = this.dataService.getUsers();
  }

  ngOnChanges() {
    console.log("UsersComponent.ngOnChanges");
    // this.roles = this.dataService.getRoles();
    // this.$users = this.dataService.getUsers();
  }

  getRoleName(roleId: number): string {
    return this.dataService.getRoleName(roleId);
  }

  getRoleColour(roleId: number): string {
    return this.dataService.getRoleColour(roleId);
  }

  onNameInput(event: any, userId: number) {
    this.dataService.updateUserName(event.target.value, userId)
  }
}
