import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { map  } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDataSubject: BehaviorSubject<any>;
  public userState$: Observable<any>;

  constructor( private _api: ApiService, private _token: TokenStorageService, private http: HttpClient ) { 
    this.userDataSubject = new BehaviorSubject<any>(this._token.getUser());
    this.userState$ = this.userDataSubject.asObservable();
  }

  getUser(){
    return this.userDataSubject?.value
  }

  login( credentials: any ): Observable<any> {
    return this._api
      .postTypeRequest('auth/login', {
        email: credentials.email,
        u_password: credentials.password,
      })
      .pipe(
        map(( response: any ) => {
          let user = {
            email: credentials.email,
            token: response.token,
          };
          this._token.setToken(response.token);
          this._token.setUser(response.data[0]);
          sessionStorage.setItem('auth-user', JSON.stringify(response.data[0]));

          this.userDataSubject.next(user); 
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

    this.userDataSubject.next(null);  

  }

  getUserId() {
    const user = sessionStorage.getItem('auth-user');
    if (user) {

      const parsedUser = JSON.parse(user);

      const userId = parsedUser.id;

      return userId;

    } else {

      return null; 
    }
  }

  isUserLoggedIn(): boolean {

    return !!sessionStorage.getItem('auth-user');
  }

}
