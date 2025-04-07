import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authSubscription!: Subscription; 

  totalItens: number = 0; 
  favoritesLength: number = 0;
  
  cartSubscription!: Subscription;
  favoriteSubscription!: Subscription;

  userOn: boolean = false; 

  constructor(
    private cartService: CartService, 
    private userService: UserService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {   
    this.cartSubscription = this.cartService.totalItens$.subscribe(total => {
      this.totalItens = total; 

    });

    this.favoriteSubscription = this.favoriteService.getFavoritesLengthObservable()
    .subscribe(length => {
      this.favoritesLength = length;
    });

    this.authSubscription = this.userService.loggedIn$.subscribe(loggedIn => {
      this.userOn = loggedIn;
      this.cdr.detectChanges(); 
      
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.totalItens = 0;

    this.router.navigate(['/']);
  }
}
