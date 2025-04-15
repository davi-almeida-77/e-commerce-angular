import { Component, OnInit } from '@angular/core';
import { productModel } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ShoppingFacadeService } from '../../services/shopping-facade.service';

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
    private ShoppingService: ShoppingFacadeService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.cartExists = sessionStorage.getItem('cart') !== null;    

    this.ShoppingService.getCartItems().subscribe(( cart: productModel[]) => {
      this.cartItems = cart
      this.totalPrice = this.ShoppingService.getTotalPrice();
    })

    this.ShoppingService.getTotalItens().subscribe(( total => {
      this.totalItems = total
    }))

  }

  resetCart() {
    this.ShoppingService.resetCart();

    this.router.navigate(['/shop']);  

  }


}
