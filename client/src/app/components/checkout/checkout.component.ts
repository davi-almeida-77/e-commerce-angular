import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../services/notification.service';


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
    cvv: '',
    name: ''
  };


    validateFields(): boolean {
      let isValid = true;
      let message = '';
  
      if (this.currentStep === 1) {

        if (!this.residenceInfo.address || !this.residenceInfo.city || !this.residenceInfo.postalCode) {
          isValid = false;
          message = 'Please fill in all address fields correctly ';
        }
      } else if (this.currentStep === 2) {

        if (!this.paymentInfo.cardNumber || !this.paymentInfo.expirationDate || !this.paymentInfo.cvv || !this.paymentInfo.name) {
          isValid = false;
          message = 'Please fill in all payment fields correctly ';
        }
      }
  
      if (!isValid) {

        this.notify.showInfo(message);
      }
  
      return isValid;
    }
  

    nextStep() {
      if (this.currentStep < 3 && this.validateFields()) {
        this.currentStep++;
      }
    }
  
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    }
  
  submitCheckout() {
    this.notify.showSuccess('Success Checkout')
  }


  constructor(
    private authService: AuthService, 
    private cartService: CartService,
    private orderService: OrderService,
    private notify: NotificationService
  ) {}

  sendOrderToDatabase(): void {
    if ( this.authService.isUserLoggedIn() ) {
      this.cartService.getCartItems().subscribe(cartItems => {
        const userId = this.authService.getUserId(); 
    
        if (cartItems && userId) {
          this.notify.showSuccess('Sending order')
  
          this.orderService.orderParams(cartItems, userId);
        } else {
          this.notify.showError('Error in cart')
        }
      }, error => {
        this.notify.showError('Error in get Cart Products')
      });
    }
  }
}
