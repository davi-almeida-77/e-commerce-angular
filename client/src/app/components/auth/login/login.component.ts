import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { AlertsService } from '../../../shared/services/alerts.service';

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
      private alert: AlertsService,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    if ( !this.email || !this.u_password ) {

      this.alert.error("Fill out all forms, and try again")

      this.loading = false;
      return; 
    } else {
      this.authService.login({ email: this.email, password: this.u_password }).subscribe(
          response => {
            this.loading = false;
            this.router.navigate(['/']);
            
            this.alert.success("Login  Sucessful")

          },
          (err) => {

            this.alert.error("Something Went Wrong")

            this.loading = false;
          }
        );
    }
  }

  canSubmit(): boolean {
    return this.email.length > 0 && this.u_password.length > 0;
  }
}
