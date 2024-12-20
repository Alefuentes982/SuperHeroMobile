import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RegisterFirebaseService } from '../services/register-firebase.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, ViewWillEnter {

  nombreUsuario: string = '';
  contrasena: string = '';
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  rol: string = 'usuario';
  esAdministrador: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private firebaseService: RegisterFirebaseService
  ) { }

  ionViewWillEnter() {
    console.log('Limpiando campos en ViewWillEnter');
    this.limpiarFormulario();
  }

  // Método para cambiar el rol
  toggleRol(event: any) {
    this.rol = event.detail.checked ? 'admin' : 'usuario';
    console.log('Rol seleccionado:', this.rol);
  }

  // Método para registrar un usuario
  agregarUsuario() {
    // Validación de campos obligatorios
    if (this.nombre.trim() && this.apellido.trim() && this.email.trim() && this.contrasena.trim()) {
      console.log('Iniciando proceso de registro...');

      const datosUsuario = {
        usuario: this.nombreUsuario.trim(),
        nombre: this.nombre.trim(),
        apellido: this.apellido.trim(),
        email: this.email.trim(),
        rol: this.rol,
      };

      // Llamar al servicio para registrar el usuario
      this.firebaseService.crearUsuarioConAuth(this.email, this.contrasena, datosUsuario)
        .then(() => {
          console.log('Usuario registrado correctamente en Authentication y Firestore.');
          alert('Usuario registrado correctamente.');
          this.limpiarFormulario();
          this.router.navigate(['/landing']);
        })
        .catch((error) => {
          console.error('Error al registrar usuario:', error);
          alert('Error al registrar el usuario: ' + error.message);
        });
    } else {
      console.error('Todos los campos son obligatorios');
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    console.log('Se limpian los campos del formulario');
    this.nombreUsuario = '';
    this.contrasena = '';
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.rol = 'usuario';
    this.esAdministrador = false;
  }

  ngOnInit() {
    console.log('Componente RegisterPage inicializado');
    this.limpiarFormulario();
  }
}
