import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { orderModel } from '../../shared/models/order.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  imports: [CommonModule]
})
export class OrderHistoryComponent implements OnInit {
  orders: orderModel[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Erro ao carregar pedidos:', error);
      }
    );
  }
}
