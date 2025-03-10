
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { orderModel } from '../shared/models/order.model';
import { environment } from '../../environment/environment';
import { NotificationService } from './notification.service';


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
  private notify: NotificationService ) {
    this.apiUrl = this.apiService.baseUrl; 
  }
 
  sendOrderToDatabase(orderData: any): void {

    const apiUrl = `${this.apiService.baseUrl}orders/create`;
  
    this.http.post(apiUrl, orderData).subscribe( response => {
      
      return response;

    }, error => {

      return error;
    });
  }
  
  createOrder() {
  if ( this.authService.isUserLoggedIn()) {
    const cartItems = this.cartService.getCartItems();

    const userId = this.authService.getUserId();

    if ( cartItems && userId ) {
      this.notify.showSuccess('Order Created Successfully')
    }
    else {
      this.notify.showError('Cart is Empty')
    }
  } else {
    this.notify.showError('User is not On ')
  }
  }

  orderParams(cartItems: any[], userId: number): void {

    userId = this.authService.getUserId();

    const orderItems = cartItems.map(item => ({
      id_product: item.id_product,
      quantity: item.quantity
    }));
  
    const orderData =  {
      user_id: userId,     
      products: orderItems
    }
  
    this.sendOrderToDatabase(orderData);
    
  }

  getOrders(): Observable<orderModel[]> {
    const id = this.authService.getUserId();
    return this.http.get<orderModel[]>(`${this.url + 'orders'}/${id}`);
  }
  
}