import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Role } from "../models/models";
import { HttpErrorService } from "./http-error.service";

@Injectable()
export class RolesService {
  constructor(
    private http: HttpClient,
    private httpErrorService: HttpErrorService
  ) {}

  getRoles(): Observable<Role[]> {
    const noCorsBlock = !!Math.floor(Math.random() * 11);
    return this.http
      .get<Role[]>(
        `https://custom.rotacloud.com/angular-challenge/${
          noCorsBlock ? "roles.json" : "joker.json"
        }`
      )
      .pipe(retry(3), catchError(this.httpErrorService.handleError));
  }
}
