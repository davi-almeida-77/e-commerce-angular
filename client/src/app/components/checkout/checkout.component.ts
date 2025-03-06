import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent {
  currentStep: number = 1;  

  residenceInfo = {
    address: '',
    city: '',
    postalCode: ''
  };

  paymentInfo = {
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  };

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  } 
  
  submitCheckout() {
    console.log("Success Checkout ", this.residenceInfo, this.paymentInfo);
  }


  constructor(
    private authService: AuthService, 
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  sendOrderToDatabase(): void {
    if ( this.authService.isUserLoggedIn() ) {
      this.cartService.getCartItems().subscribe(cartItems => {
        const userId = this.authService.getUserId(); 
    
        if (cartItems && userId) {
          console.log('Sending order with the following items:', cartItems);
  
          this.orderService.orderParams(cartItems, userId);
        } else {
          console.log('Error in cart');
        }
      }, error => {
        console.error('Error in get Cart Products ', error);
      });
    }
  }
}
