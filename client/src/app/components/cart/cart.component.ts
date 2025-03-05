import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { productModel } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    
    this.cartService.getCartItems().subscribe((cart: productModel[]) => {
      this.cartItems = cart; 
      this.totalItems = this.cartService.getTotalItems(); 
      this.totalPrice = this.cartService.getTotalPrice(); 
    });
  }

  cleanCart() {
    this.cartService.resetCart();
    window.location.reload();
  }

}
