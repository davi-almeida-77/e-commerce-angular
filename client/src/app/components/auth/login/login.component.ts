import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Adicione essa linha




@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  u_password: string = '';
  loading: Boolean = false;
  error:any = '';

  constructor( private _auth: AuthService, private _router: Router ) {}

ngOnInit(): void {}

onSubmit () {
  this.loading = true;
  this.error = '';
  if (!this.email || !this.u_password) {
    console.log("Fill out all Forms, and Try Again ")
    return; 
  }
  else {
    this._auth.login({ email: this.email, password: this.u_password })
    .subscribe(
      response => {
        this.loading = false;
        this._router.navigate(['/']);
      },
      ( err ) => {
        console.log( err )
        this.error = err.error.message;
        this.loading = false;
      }
    )
  };
}

canSubmit(): boolean {
  return this.email.length > 0 && this.u_password.length > 0;
}

}
