import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Role } from './models';

@Injectable()
export class RolesService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(
      "https://custom.rotacloud.com/angular-challenge/roles.json"
    );
  }
}
