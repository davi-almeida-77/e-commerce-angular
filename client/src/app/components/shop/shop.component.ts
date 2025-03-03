import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

import { productModel } from '../../shared/models/product.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'], 
})
export class ShopComponent implements OnInit {
  products: productModel[] = []; 

  constructor(private productService: ProductService, private router: Router ,  private cartService: CartService ,  ) {}  

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: productModel[]) => {  
        this.products = data; 
      },
      (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    );
  }

  SingleProductPage(productId: number): void {
    this.router.navigate([`/product/${productId}`]);
  }

  addToCart(product: productModel): void {
    this.cartService.addToCart({
      ...product,
      quantity: 1,  
    });
  }
  
}
