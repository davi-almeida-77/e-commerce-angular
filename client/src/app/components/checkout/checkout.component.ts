import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { take } from 'rxjs';
import { ShoppingFacadeService } from '../../services/shopping-facade.service';


@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent {

  constructor(
    private ShoppingService: ShoppingFacadeService,
    private orderService: OrderService,
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

          this.ShoppingService.alertError( message )

        }
      } 
      else if  (this.currentPage === 2 ) {

        if ( !this.paymentInfo.cardNumber || !this.paymentInfo.expirationDate || !this.paymentInfo.cvv || !this.paymentInfo.name ) {
          isValid = false;

          message = 'Please fill in all payment fields correctly ';

          this.ShoppingService.alertError( message )

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
    this.ShoppingService.alertSuccess("Success Checkout")
  }

  sendOrderToDatabase(): void {

  this.ShoppingService.getCartItems().pipe(take(1)).subscribe( cartItems => {

    const userId = this.ShoppingService.getUserId();

    const clonedCart = JSON.parse(JSON.stringify( cartItems ));

    if ( clonedCart && userId  ) {

      this.ShoppingService.alertSuccess("Sending Order")

      this.orderService.getOrderData( clonedCart, userId )
    }

  })

  }
  

}
