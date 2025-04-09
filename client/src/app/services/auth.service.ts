import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { map  } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDataSubject: BehaviorSubject<any>;
  public userState$: Observable<any>;

  constructor ( 
    private apiService: ApiService,
    private token: TokenStorageService,
     ) 

     { 

    this.userDataSubject = new BehaviorSubject<any>(this.token.getUser());
    this.userState$ = this.userDataSubject.asObservable();

  }

  getUser() {
    return this.token.getUser();  
  }
  
  login( credentials: any ): Observable<any> {
    return this.apiService
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
          this.token.setToken(response.token);
          this.token.setUser(response.data[0]);
          sessionStorage.setItem('auth-user', JSON.stringify(response.data[0]));

          this.userDataSubject.next(user); 
          return user;
        })
      );
  }

  register(user: any): Observable<any> {
    return this.apiService.postTypeRequest('auth/register', {
      username: user.username,
      f_name: user.f_name,
      l_name: user.l_name,
      email: user.email,
      u_password: user.u_password,
    });
  }

  logout() {
    
    this.token.clearStorage();

    this.userDataSubject.next(null);  

  }

  getUserId() {

    const user = sessionStorage.getItem('auth-user');

    if ( user ) {

      const parsedUser = JSON.parse( user );

      const userId = parsedUser.id;

      return userId;

    } 

  }

  isUserLoggedIn(): boolean {

    return !!sessionStorage.getItem('auth-user');

  }

}
