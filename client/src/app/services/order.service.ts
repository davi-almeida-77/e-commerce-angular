
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { orderModel } from '../shared/models/order.model';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.apiUrl; 
  apiUrl: string;

  constructor (
  private http: HttpClient, 
  private apiService: ApiService, 
  private cartService: CartService, 
  private authService: AuthService,
  private router: Router
 ) {
    this.apiUrl = this.apiService.baseUrl; 
  }
 
  createOrder(orderData: any) {
    const apiUrl = `${this.apiService.baseUrl}orders/create`;
  
    this.http.post(apiUrl, orderData).subscribe(
      response => {
        this.router.navigate(['/']);
        this.cartService.resetCart();
      },
      error => {
        console.log( error )
      }
    );
  }
  
  getOrderData(cartItems: any[], userId: number): void {

    userId = this.authService.getUserId();

    const orderItems = cartItems.map(item => ({
      id_product: item.id_product,
      quantity: item.quantity
    }));
  
    const orderData =  {
      user_id: userId,     
      products: orderItems
    }
  
    this.createOrder( orderData ) 
    
  }

  getOrders(): Observable<orderModel[]> {
    const id = this.authService.getUserId();
    return this.http.get<orderModel[]>(`${this.url + 'orders'}/${id}`);
  }
  
}