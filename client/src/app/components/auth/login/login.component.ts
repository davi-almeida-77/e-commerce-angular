import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  u_password: string = '';
  loading: Boolean = false;
  error: string  = '';

  constructor( 
      private authService: AuthService,
      private router: Router,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    if ( !this.email || !this.u_password ) {
      Swal.fire({
          title: `Fill out all forms, and try again`, 
          icon: 'error',
          position: 'top-right',  
          showConfirmButton: false,   
          timer: 2000,  
          toast: true,  
          timerProgressBar: true  
        });
      this.loading = false;
      return; 
    } else {
      this.authService.login({ email: this.email, password: this.u_password }).subscribe(
          response => {
            this.loading = false;
            this.router.navigate(['/']);
                  Swal.fire ({
                    title: "Sucessful",
                    text: 'Login  Sucessful',
                    icon: 'success',
                    position: 'top-right',  
                    showConfirmButton: false,   
                    timer: 3000, 
                    toast: true,  
                    timerProgressBar: true  
                  })
            this.cdr.detectChanges();  
          },
          (err) => {
            Swal.fire ({
              title: "Error",
              text: 'Something Went Wrong',
              icon: 'error',
              position: 'top-right',  
              showConfirmButton: false,   
              timer: 3000, 
              toast: true,  
              timerProgressBar: true  
            })
            this.loading = false;
          }
        );
    }
  }

  canSubmit(): boolean {
    return this.email.length > 0 && this.u_password.length > 0;
  }
}
