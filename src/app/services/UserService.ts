import {Injectable} from "@angular/core";
import {User} from "../models/User";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private http: HttpClient
  ) {
  }

  public login(user: User): Observable<User> {
    return this.http.post(`${environment.serverUrl}/user/login`, user) as Observable<User>
  }
}
