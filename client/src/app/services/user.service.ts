import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInSubject: BehaviorSubject<boolean>;
  loggedIn$: Observable<boolean>;

  constructor( private authService: AuthService ) {
   
    this.loggedInSubject = new BehaviorSubject<boolean>(this.authService.isUserLoggedIn());

    this.loggedIn$ = this.authService.userState$.pipe(
      map(user => !!user) 
    );
  }

}
