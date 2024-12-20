import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RegisterFirebaseService } from '../services/register-firebase.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  //nombreUsuario: string = '';
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

  // Método para cambiar el rol según el toggle
  toggleRol(event: any) {
    this.rol = event.detail.checked ? 'admin' : 'usuario';
    console.log('Rol seleccionado:', this.rol);
  }

  funcionRegistro() {
    this.router.navigate(['/login']);
  }

  agregarUsuario() {
    // Eliminar espacios en blanco de los campos
    const nombre = this.nombre?.trim();
    const apellido = this.apellido?.trim();
    const email = this.email?.trim();
    const contrasena = this.contrasena?.trim();

    // Validación: No permitir campos vacíos
    if (!nombre || !apellido || !email || !contrasena || !this.rol) {
      console.log('Los campos no pueden estar vacíos');
      alert('Todos los campos son obligatorios.');
      return;
    }

    console.log('Iniciando proceso de registro en Authentication...');
    // Llamar al servicio para registrar el usuario
    this.firebaseService.crearUsuarioConAuth(email, contrasena, {
      nombre,
      apellido,
      email,
      rol: this.rol, // Define el rol en el formulario
    })
      .then(() => {
        console.log('Usuario registrado correctamente en Authentication y Firestore.');
        alert('Usuario registrado correctamente.');
        this.limpiarFormulario();
        this.router.navigate(['/administrador']); // Redirige al administrador
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario: ' + error.message);
      });
  }

  limpiarFormulario() {
    console.log("se limpian los campos agregar")
    //this.nombreUsuario = '';
    this.contrasena = '';
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.rol = 'usuario';
    this.esAdministrador = false;
  }

  ngOnInit() {
    console.log('Componente de agregar inicializado'); // Depuración
  }

}
