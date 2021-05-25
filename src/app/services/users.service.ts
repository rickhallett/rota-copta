import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import { User } from "../models/models";
import { HttpErrorService } from "./http-error.service";

@Injectable()
export class UsersService {
  constructor(
    private http: HttpClient,
    private httpErrorService: HttpErrorService
  ) {}

  getUsers(): Observable<User[]> {
    const noCorsBlock = !!Math.floor(Math.random() * 11);
    return this.http
      .get<User[]>(
        `https://custom.rotacloud.com/angular-challenge/${
          noCorsBlock ? "users.json" : "joker.json"
        }`
      )
      .pipe(retry(3), catchError(this.httpErrorService.handleError));
  }
}
