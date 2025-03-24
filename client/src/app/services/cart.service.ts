import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { productModel } from '../shared/models/product.model';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartSubject: BehaviorSubject < productModel [] >= new BehaviorSubject < productModel [] >( [] );  
  totalItens: number = 0;
  totalPrice: number = 0;

  constructor( private router: Router, notify: NotificationService ) {
    const storedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.cartSubject.next(storedCart);  
    this.updateCart();  
  }

  private totalItensSubject = new BehaviorSubject<number>(0); 
  totalItens$ = this.totalItensSubject.asObservable();

  
  addToCart(product: productModel): void {
    let cart = this.cartSubject.getValue();  
  
    const existentProduct = cart.find((item: productModel) => item.id_product === product.id_product);

    const quantityToAdd = product.quantity ?? 1;
  
    if (existentProduct) {
      
      existentProduct.quantity = (existentProduct.quantity || 0) + quantityToAdd;
    } 
    else {
      cart.push({
        ...product,
        quantity: quantityToAdd,
      });
    }
  
    
    sessionStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);  
    this.updateCart();  
  }
  

  
  updateCart(): void {
    const cart = this.cartSubject.getValue();  

    this.totalItens = cart.reduce(( acc: number, item: productModel ) => acc + (item.quantity || 0), 0); 

    this.totalItensSubject.next(this.totalItens); 

    this.totalPrice = cart.reduce(( acc: number, item: productModel ) => {
      if ( item.quantity && item.price && !isNaN( item.quantity ) && !isNaN( item.price )) {
        return acc + (item.quantity * item.price );  
      }
      return acc;
    }, 0); 

  }

  getCartItems() {
    return this.cartSubject.asObservable();  
  }

  getTotalItems() {
    return this.totalItens;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  resetCart() {
    sessionStorage.removeItem('cart');

    this.cartSubject.next([]); 
    
    this.updateCart();
  }

}
