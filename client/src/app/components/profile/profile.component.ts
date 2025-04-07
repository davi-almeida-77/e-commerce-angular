
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false,
})
export class ProfileUpdateComponent {
  constructor ( 
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
    ) {}
  

  userProfile: any;

  userId: number | undefined;
  userEmail: string | undefined;
  userPassword: string | undefined;

  userUpdate = { 
    new_email: '',
    new_u_password: '',
    matchPassword: '',
  }

  ngOnInit(): void {

    this.userProfile = this.authService.getUser()

    if ( this.userProfile ) {
      this.userId = this.userProfile.id
      this.userEmail = this.userProfile.email
      this.userPassword = this.userProfile.u_password
    }
    
  }

  isValidPassword(): Boolean {
    return this.userUpdate.new_u_password === this.userUpdate.matchPassword;
  }

  isValidEmail(): Boolean  {
    if ( this.userUpdate.new_email.length < 1 || this.userUpdate.new_email.length > 45 ) {
      return false;
    }
    return true;
    
  }

  filterAccount () {
    const { new_email, new_u_password} = this.userUpdate;

    let id =  this.userId

    let email = this.userEmail

    let u_password =  this.userPassword

    let newAccountParams = { id, email, u_password, new_email, new_u_password }

    const accountParams = JSON.stringify( newAccountParams )

    return accountParams;
  }

  sendAccountUpdate() {
  
    if (this.isValidPassword() && this.isValidEmail()) {

      const updateParams = this.filterAccount();

      this.profileService.updateUser('auth/update', updateParams).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Success on updating account!',
            position: 'top-right',  
            showConfirmButton: false,   
            timer: 3000,  
            toast: true,  
            timerProgressBar: true 
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error !',
            text: 'Something went wrong with the update.',
            position: 'top-right',  
            showConfirmButton: false,   
            timer: 3000,  
            toast: true,  
            timerProgressBar: true 
          });
        }
      );
    }

    this.authService.logout()
    this.router.navigate(['/'])
  }
  

  deleteAccount () {

    let id = this.userId

    let  email = this.userEmail

    let u_password =  this.userPassword

    const deleteParams =  {  id, email, u_password }

    this.profileService.deleteUser('auth/delete', deleteParams)
    .subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Success on Delete account ',
          position: 'top-right',  
          showConfirmButton: false,   
          timer: 3000,  
          toast: true,  
          timerProgressBar: true 
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error !',
          text: 'Something went wrong with the deletion  ',
          position: 'top-right',  
          showConfirmButton: false,   
          timer: 3000,  
          toast: true,  
          timerProgressBar: true 
        });
      }
    );

  }


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
