import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';

import {HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {
  }

  apiUrl = 'https://www.googleapis.com/youtube/v3/playlists';


  get(params?: { channelId: any; maxResult: number; part: string; key: any; pageToken?: any }): Observable<any> {
    return this.http.get(`${this.apiUrl}`, {params})
        .pipe(catchError(this.formatErrors));
  }

  formatErrors(error: any) {
    if (error instanceof HttpErrorResponse) {

      if (error.error['errors']) {
        if (error.error['errors']['0']) {
          return throwError(error.error['errors']['0'].message);
        }
      }
    }
    return throwError(error.error['message']);
  }
}
