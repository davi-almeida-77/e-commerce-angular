import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { productModel } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';





@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class CartComponent implements OnInit {
  cartItems: productModel[] = [];  
  totalItems: number = 0;           
  totalPrice: number = 0;          

  constructor(
    private cartService: CartService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.cartService.getCartItems().subscribe((cart: productModel[]) => {
      this.cartItems = cart; 
      this.totalItems = this.cartService.getTotalItems(); 
      this.totalPrice = this.cartService.getTotalPrice(); 
    });
  }

  resetCart() {
    this.cartService.resetCart(); 
  
    this.notify.showInfo('Cart was Cleaned ');
  
    setTimeout(() => {

      this.router.navigate(['/shop']);
    }, 3000);  
  }
  

}
