import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { TokenStorageService } from './token-storage.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( 
    private http: HttpClient,
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

    public baseUrl =  environment.apiUrl;

 updateUser( endpoint: string, payload: any ): Observable<any> {
  const token = this.tokenService.getToken()

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' 
  });

  const url =  this.baseUrl + endpoint

  return this.http.put(url, payload, { headers })


 }

 deleteUser( endpoint: string, payload: any ): Observable<any> {
  const token = this.tokenService.getToken()

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' 
  });

  const url =  this.baseUrl + endpoint

  return this.http.delete(url, { headers, body: payload }).pipe(
    tap (
      response => {
        this.authService.logout()
        this.router.navigate(['/'])
      },
      error => {
        console.error(error)
      }
    )
  )

 }

}
