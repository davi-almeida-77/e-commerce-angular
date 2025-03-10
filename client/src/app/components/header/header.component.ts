import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent implements OnInit, OnDestroy {
  totalItens: number = 0;  
  cartSubscription!: Subscription;
  private authSubscription!: Subscription; 
  userOn: boolean = false; 

  constructor(
    private cartService: CartService, 
    private userService: UserService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {   
    this.cartSubscription = this.cartService.totalItens$.subscribe(total => {
      this.totalItens = total; 
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
    this.router.navigate(['/']);
  }
}
