import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable()
export class HttpErrorService {
  constructor() {}

  handleError(error: HttpErrorResponse): Observable<never> {
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
