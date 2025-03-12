import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { NotificationService } from '../../../services/notification.service';

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

  constructor( private _auth: AuthService,
               private _router: Router,
               private cdr: ChangeDetectorRef,
               private notify: NotificationService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    if (!this.email || !this.u_password) {
      this.notify.showError('Fill out all forms, and try again');
      this.loading = false;
      return; 
    } else {
      this._auth.login({ email: this.email, password: this.u_password }).subscribe(
          response => {
            this.loading = false;
            this._router.navigate(['/']);
            this.notify.showSuccess('Login  Sucessful ')
            this.cdr.detectChanges();  
          },
          (err) => {
            if (err.status === 401) {
              this.notify.showError('Your email or password are incorrect');
            } else {

              this.notify.showError('An error occurred. Please try again');
            }
            if (err.status !== 401) {
              console.error('Error:', err); 
            }
            this.error = err.error?.message || 'Something went wrong';
            this.loading = false;
          }
        );
    }
  }

  canSubmit(): boolean {
    return this.email.length > 0 && this.u_password.length > 0;
  }
}
