
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl: string;

  constructor( private http: HttpClient, private apiService: ApiService,  private cartService: CartService, private authService: AuthService ) {
    this.apiUrl = this.apiService.baseUrl; 
  }
 
  sendOrderToDatabase(orderData: any): void {
    this.apiService.postTypeRequest('create/orders', orderData).subscribe(response => {
      console.log('Order successfully saved:', response);
    }, error => {
      console.log('Error saving the order:', error);
    });
  }

  createOrder() {
  if ( this.authService.isUserLoggedIn()) {
    const cartItems = this.cartService.getCartItems();
    const userId = this.authService.getUserId();
    if ( cartItems && userId ) {
      console.log('Successful oder with the Next Items: ', cartItems, 'and UserId: ', userId);
    }
    else {
      console.log('Cart is Empty ');
    }
  } else {
    console.log('User is not on ');
  }
  }

  orderParams(cartItems: any[], userId: number): void {

    const orderItems = cartItems.map(item => ([
      userId,     
      item.id_product,
      item.quantity     
    ]));
    console.log('Order Items for DB insertion: ', orderItems);

    this.sendOrderToDatabase(orderItems);
  }
  
}