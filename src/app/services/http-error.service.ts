import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Role } from "../models/models";

@Injectable()
export class HttpErrorService {
  constructor() {}

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("A client/server error occured:", error.error);
    } else {
      console.error(`Request unsuccessful: status ${error.status}`);
      console.log(error.error);
    }

    return throwError(
      "HTTP request error; please try again later, or contact your system administrator"
    );
  }
}
