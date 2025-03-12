import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { orderModel } from '../../shared/models/order.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  imports: [CommonModule]
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orders: orderModel[] = [];
  private authSubscription!: Subscription;
  userOn: boolean = false;
  username: string | null = null;
  groupedOrders: any[] = [];
  orderVisibility: { [orderId: string]: boolean } = {}; 

  constructor( 
    private orderService: OrderService,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadUser();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
        this.groupOrders();
      },
      (error) => {
        this.notify.showError('Error on loading orders');
      }
    );
  }

  loadUser(): void {
    const authUserJson = sessionStorage.getItem('auth-user');
    if (authUserJson) {
      const authUser = JSON.parse(authUserJson);
      this.username = authUser.username || null;
    }
  }

  groupOrders(): void {

    this.groupedOrders = [];
  

    this.orders.forEach(order => {

      let existingOrder = this.groupedOrders.find(group => group.orderId === order.order_number);
  
      if (existingOrder) {

        existingOrder.products.push({
          product_name: order.product_name,
          product_quantity: order.product_quantity,
          product_price: this.parseToNumber(order.product_price), 
          total_product_value: this.parseToNumber(order.total_product_value) 
        });
  

        existingOrder.totalQuantity += order.product_quantity;
        existingOrder.totalValue += this.parseToNumber(order.total_product_value);  
      } else {

        this.groupedOrders.push({
          orderId: order.order_number,
          products: [{
            product_name: order.product_name,
            product_quantity: order.product_quantity,
            product_price: this.parseToNumber(order.product_price),  
            total_product_value: this.parseToNumber(order.total_product_value)  
          }],
          totalQuantity: order.product_quantity,
          totalValue: this.parseToNumber(order.total_product_value), 
          orderDate: order.order_created_at
        });
      }
  
      
      this.orderVisibility[order.order_number] = false;
    });
  }
  

  private parseToNumber(value: any): number {
    return isNaN(parseFloat(value)) ? 0 : parseFloat(value); 
  }
  
  

  toggleOrderDetails(orderId: string): void {

    this.orderVisibility[orderId] = !this.orderVisibility[orderId];
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
