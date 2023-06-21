import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.authService.login(loginForm.value.email, loginForm.value.password).then(response => {
      console.log('response', response);
      this.router.navigate(['/']);
  })
  .catch(error => {  console.log('error', error);
      switch(error.code) {
          case 'auth/invalid-email':console.log('error', error);
            this.errorMessage = 'El correo no es válido o no ingresaste tu correo electrónico'; break;
          case 'auth/wrong-password':console.log('error', error);
            this.errorMessage = 'Contraseña inválida'; break;
          case 'auth/user-not-found': 
            this.errorMessage = 'El usuario no existe, ingresa un usuario existente'; break;
          default:console.log('error', error);
            this.errorMessage = 'Algo salio mal mientras ingresabas, por favor vuelve a intentarlo.';
      }
  });
  }

}
