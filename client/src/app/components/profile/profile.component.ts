
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false,
})
export class ProfileUpdateComponent {
  constructor ( private authService: AuthService, private notify: NotificationService) {}

  userProfile: any;

  userUpdate = { 
    email: '',
    password: '',
    matchPassword: '',
  }

  ngOnInit(): void {

    this.authService.userState$.subscribe(userData => {
      this.userProfile = userData;
    })
  }

  isValidPassword(): Boolean {
    return this.userUpdate.password === this.userUpdate.matchPassword;
  }

  isValidEmail(): Boolean  {
    if ( this.userUpdate.email.length < 5 || this.userUpdate.email.length > 45 ) {
      return false;
    }
    return true;
    
  }

  filterAccount () {
    const { email, password } =  this.userUpdate;
    let newAccountParams = { email, password }
    return newAccountParams;
  }

  sendAccountUpdate () {
    if ( this.isValidPassword() && this.isValidEmail() ) {
      const newParams = this.filterAccount();
      console.log( newParams )
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Something went Wrong ',
        position: 'top-right',  
        showConfirmButton: false,   
        timer: 3000,  
        toast: true,  
        timerProgressBar: true 
      });
    }
  }  

  deleteAccount () {}


  showAlert() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#24d700",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "DELETE",
      cancelButtonText: "CANCEL",
    }).then(( result ) => {
      if ( result.isConfirmed == true ) {
        this.deleteAccount();
      }
    })
  }
  
  
}
