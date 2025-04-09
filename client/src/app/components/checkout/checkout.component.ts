import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';


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

          Swal.fire({
            title: `Success `, 
            text: message, 
            icon: 'warning',
            position: 'top-right',  
            showConfirmButton: false,   
            timer: 3000,  
            toast: true,  
            timerProgressBar: true  
          });

        }
      } else if (this.currentPage === 2) {

        if ( !this.paymentInfo.cardNumber || !this.paymentInfo.expirationDate || !this.paymentInfo.cvv || !this.paymentInfo.name ) {
          isValid = false;
          message = 'Please fill in all payment fields correctly ';

          Swal.fire({
            title: ` Success   `, 
            text: message, 
            icon: 'warning',
            position: 'top-right',  
            showConfirmButton: false,   
            timer: 3000,  
            toast: true,  
            timerProgressBar: true  
          });

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

    Swal.fire({
      title: ` Success   `, 
      text: 'Success Checkout',
      icon: 'success',
      position: 'top-right',  
      showConfirmButton: false,   
      timer: 3000,  
      toast: true,  
      timerProgressBar: true  
    });

  }

  sendOrderToDatabase(): void {

    if ( this.authService.isUserLoggedIn() ) {
      this.cartService.getCartItems().subscribe(cartItems => {
        const userId = this.authService.getUserId(); 
    
        if ( cartItems && userId ) {

              Swal.fire({
                title: `Sending order  `, 
                text: 'The Product Was Added on Favorites List ',
                icon: 'success',
                position: 'top-right',  
                showConfirmButton: false,   
                timer: 3000,  
                toast: true,  
                timerProgressBar: true  
              });
  
          this.orderService.orderParams( cartItems, userId );
          
        } else {

          Swal.fire({
            title: `Error  `, 
            text: 'Error in cart',
            icon: 'error',
            position: 'top-right',  
            showConfirmButton: false,   
            timer: 3000,  
            toast: true,  
            timerProgressBar: true  
          });

        }
      }, error => {

        Swal.fire({
          title: `Error  `, 
          text: 'Error in get Cart Products',
          icon: 'error',
          position: 'top-right',  
          showConfirmButton: false,   
          timer: 3000,  
          toast: true,  
          timerProgressBar: true  
        });
      });
    }

    this.cartService.resetCart();

  }
}
