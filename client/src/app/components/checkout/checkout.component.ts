import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AlertsService } from '../../shared/services/alerts.service';


@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent {

  constructor(
    private authService: AuthService, 
    private cartService: CartService,
    private orderService: OrderService,
    private alert: AlertsService
  ) {}

  currentPage: number = 1;  

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
  
      if ( this.currentPage === 1 ) {

        if ( !this.residenceInfo.address || !this.residenceInfo.city || !this.residenceInfo.postalCode ) {
          isValid = false;

          message = 'Please fill in all address fields correctly ';

          this.alert.error( message )

        }
      } else if (this.currentPage === 2) {

        if ( !this.paymentInfo.cardNumber || !this.paymentInfo.expirationDate || !this.paymentInfo.cvv || !this.paymentInfo.name ) {
          isValid = false;

          message = 'Please fill in all payment fields correctly ';

          this.alert.error( message )

        }
      }
  
      return isValid;
    }
  

    nextStep() {
      if (this.currentPage < 3 && this.validateFields()) {
        this.currentPage++;
      }
    }
  
    prevStep() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
  submitCheckout() {
    this.alert.success("Success Checkout")
  }

  sendOrderToDatabase(): void {

    if ( this.authService.isUserLoggedIn() ) {

      this.cartService.getCartItems().subscribe(cartItems => {

        const userId = this.authService.getUserId(); 
    
        if ( cartItems && userId ) {
          this.alert.success("Sending order")

          this.orderService.orderParams( cartItems, userId );
        
        } 
        else {
          this.alert.error("Error in cart")
        }
      },
       error => {
        this.alert.error("Error in get Cart Products")
      });
    }

    this.cartService.resetCart();

  }
}
