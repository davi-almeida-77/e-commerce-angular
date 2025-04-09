import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private route: Router, private token: TokenStorageService ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    const currentUser = this.token.getUser(); 

    if (currentUser) {
      return true; 
    }

    this.route.navigate(['/login']); 
    return false; 
  }
}
