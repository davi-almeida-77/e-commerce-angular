import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

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
    private cartService: CartService
  ) {}


  finishOrder(): void {
    if (this.authService.isUserLoggedIn()) {

      this.cartService.getCartItems().subscribe(cartItems => {
        const userId = this.authService.getUserId();
        
        if (cartItems && userId) {

          this.VisualizeDataBeforeGo(cartItems, userId);
        } else {
          console.log('Error in cart ');
        }
      }, error => {
        console.log('Error in Get Items from Cart: ', error);
      });
    } else {
      console.log('User is Not Logged .');
    }
  }


  VisualizeDataBeforeGo(cartItems: any[], userId: number): void {
    const orderItems = cartItems.map(item => ([
      userId,        
      item.id_product, 
      item.quantity  
    ]));


    console.log('Preparing Order for Backend: ', orderItems);

    const orderPreview = orderItems.map(item => ({
      user_id: item[0],
      product_id: item[1],
      quantity: item[2]
    }));

    console.log('Pre Visualization: ', orderPreview);
  }

}
