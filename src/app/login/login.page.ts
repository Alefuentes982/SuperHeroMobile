import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterFirebaseService } from '../services/register-firebase.service';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: RegisterFirebaseService
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.formulario.reset();
    localStorage.clear(); // Limpiar caché local
    sessionStorage.clear(); // Limpiar sesión
  }

  // Método para validar e iniciar sesión
  onSubmit(): void {
    if (this.formulario.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const { email, password } = this.formulario.value;

    // Llamar al servicio para iniciar sesión
    this.authService.iniciarSesion(email, password);
    this.formulario.reset();
  }



  //constructor(private router: Router, private navCtrl: NavController) { }

  //funcionInicioSesion() {
  //if (this.usuario === 'victor') {
  // this.router.navigate(['/administrador'])
  //} else {
  //  this.router.navigate(['/usuario'])
  // }
  // }



}
