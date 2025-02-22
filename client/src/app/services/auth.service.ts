import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: BehaviorSubject<any>;
  public userState: Observable<any>;

  constructor( private _api: ApiService, private _token: TokenStorageService ) { 
    this.userData = new BehaviorSubject<any>(this._token.getUser());
    this.userState = this.userData.asObservable();
  }
  getUser(){
    console.log(this.userData);
    console.log(this.userData?.value);
    return this.userData?.value
  }

  login(credentials: any): Observable<any> {
    return this._api
      .postTypeRequest('auth/login', {
        email: credentials.email,
        u_password: credentials.password,
      })
      .pipe(
        map((response: any) => {
          let user = {
            email: credentials.email,
            token: response.token,
          };
          this._token.setToken(response.token);
          this._token.setUser(response.data[0]);
          console.log(response);
          this.userData.next(user);
          return user;
        })
      );
  }
  register(user: any): Observable<any> {
    return this._api.postTypeRequest('auth/register', {
      username: user.username,
      f_name: user.f_name,
      l_name: user.l_name,
      email: user.email,
      u_password: user.u_password,
    });
  }

  logout() {
    this._token.clearStorage();
    this.userData.next(null);
  }
}
