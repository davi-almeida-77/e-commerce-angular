import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';

  constructor() { }

  public getToken(): string {
    const sessionToken = sessionStorage.getItem(this.TOKEN_KEY);
    return sessionToken ? sessionToken  : '';
  }

  public setToken(token: string) {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.setItem(this.TOKEN_KEY, token)
  }

  getUser(): any {
    const userKey = sessionStorage.getItem(this.USER_KEY);
    return userKey ? JSON.parse(userKey) : ''; 
  }
  
  setUser(user: any): void {
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clearStorage(): void {
    sessionStorage.clear();
  }

}
