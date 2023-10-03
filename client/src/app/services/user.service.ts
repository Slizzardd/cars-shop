import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUserURL = "http://localhost:8080/api/v1";

  constructor(private httpClient: HttpClient) {
  }

  public createUser(data: any) {
    return this.httpClient.post<{jwtToken: string}>(`${this.baseUserURL}/user/createUser`, data).pipe(
      tap(({jwtToken}) => {
        localStorage.setItem('auth-token', jwtToken);
      })
    );
  }

  public loginUser(data: any) {
    return this.httpClient.post<{ jwtToken: string }>(`${this.baseUserURL}/user/loginUser`, data).pipe(
      tap(({jwtToken}) => {
        localStorage.setItem('auth-token', jwtToken);
      })
    );
  }

  getActualUser() {
    const options = this.getOptions();

    return this.httpClient.get(`${this.baseUserURL}/user/getUserByToken`, options);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("auth-token")}`
    });
  }

  private getOptions(): { headers: HttpHeaders } {
    return {headers: this.getHeaders()};
  }
}
