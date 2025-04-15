import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertsService } from '../../../shared/services/alerts.service';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username:  string = '';
  f_name: string = '';
  l_name: string = '';
  email: string = '';
  u_password: string = '';
  m_password: string = '';
  loading: Boolean = false;
  error: any = '';

  constructor ( 
    private authService: AuthService, 
    private router: Router,
    private alert: AlertsService,
   ) {}

  ngOnInit(): void {}


matchPasswords( u_password: string, m_password: string ): boolean {
  return u_password === m_password;
}

  onSubmit() {
    this.loading = true;
    this.error = '';
    if ( !this.username || !this.f_name || !this.l_name || !this.email || !this.u_password || !this.m_password ) {

      this.alert.error("Please fill out all Forms, and Try again")

      return;
    }
    if ( !this.matchPasswords(this.u_password, this.m_password )) {

      this.alert.error("The passwords do not match. Please try again")

      return;
    }
    else {
      this.authService.register({ username: this.username, f_name: this.f_name, l_name: this.l_name, email: this.email, u_password: this.u_password }).
      subscribe(
        response => {
          this.loading = false;

          this.router.navigate(['/']);

          this.alert.success("Sucessfull Registered")

        },
        (err) => {

          this.alert.error("Error in Registry")

        }
      )
    }
  }

  canSubmit(): boolean {
    return this.email.length > 0 && this.u_password.length > 0;
  }
}
