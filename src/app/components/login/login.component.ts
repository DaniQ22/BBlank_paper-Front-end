import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { signUp } from 'src/app/models/signUpModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  dataLogin: any;

  formSignUp!: FormGroup;
  dataSignUp!: signUp;

  isSignUpMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.formSignUp = this.formBuilder.group({
      firstNameUser: ['', Validators.required],
      lastNameUser: ['', Validators.required],
      emailUser: ['', Validators.required],
      passwordUser: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  login() {
    // Verificar si el formulario es válido
    if (this.formLogin.invalid) {
      // Mostrar un mensaje más descriptivo al usuario
      alert('Por favor, complete todos los campos obligatorios correctamente.');
      return;
    }

    // Obtener los datos del formulario
    this.dataLogin = this.formLogin.value;

    // Llamar al servicio de inicio de sesión
    this.loginService.login(this.dataLogin).subscribe(
      (res) => {
        // Manejar la respuesta exitosa
        console.log('Inicio de sesión exitoso:', res);

        // Resetear el formulario
        this.formLogin.reset();

        // Redirigir al usuario a la página de inicio
        this.route.navigateByUrl('/index');
      },
      (error) => {
        alert(error)
      }
    );
  }

  signUp() {
    console.log(this.formSignUp.value);
    if (!this.formSignUp.valid) {
      alert('Por favor, llene todos los campos');
      return;
    }
    const password = this.formSignUp.value.passwordUser;
    const repeatPassword = this.formSignUp.value.repeatPassword;
    if (password !== repeatPassword) {
      alert('Error, las contraseñas no coinciden');
      return;
    }

    this.dataSignUp = this.formSignUp.value;
    this.loginService.signUp(this.dataSignUp).subscribe(
      (res) => {
        if (res) {
          alert(res);
          this.formSignUp.reset();
        }
      },
      (error) => {
        alert(error);
      }
    );
  }

  sign_up_mode() {
    this.isSignUpMode = !this.isSignUpMode;
    console.log(this.isSignUpMode);
  }
  sign_up_mode2() {
    this.isSignUpMode = !this.isSignUpMode;
  }
}
