import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent  {
  totalItens: number = 0;  
  cartSubscription!: Subscription; 

  constructor(private cartService: CartService) {}


  ngOnInit() {
    this.cartService.totalItens$.subscribe(total => {
      this.totalItens = total; 
    });
  }
}
