import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { productModel } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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
  cartExists: boolean = false;
        

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.cartExists = sessionStorage.getItem('cart') !== null;    

    this.cartService.getCartItems().subscribe((cart: productModel[]) => {
      this.cartItems = cart; 
      this.totalItems = this.cartService.getTotalItems();  
      this.totalPrice = this.cartService.getTotalPrice();  
    });

    this.cartService.totalItens$.subscribe((total) => {
      this.totalItems = total;  
    });
  }

  resetCart() {
    this.cartService.resetCart(); 

    Swal.fire({
        title: `Cleaned Cart `, 
        icon: 'success',
        position: 'top-right',  
        showConfirmButton: false,   
        timer: 2000,  
        toast: true,  
        timerProgressBar: true  
      });
  
    this.router.navigate(['/shop']);  
  }
  
}
