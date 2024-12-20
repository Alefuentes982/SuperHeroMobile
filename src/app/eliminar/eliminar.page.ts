import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RegisterFirebaseService } from '../services/register-firebase.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  usuarios: any[] = []; //lista para traer los datos de los usuarios registrados

  constructor(private router: Router,
    private navCtrl: NavController,
    private firebaseService: RegisterFirebaseService
  ) { }

  ngOnInit() {
    // traer los datos de la tabla
    this.firebaseService.getData('Usuarios').subscribe((data) => {
      this.usuarios = data || [];
      //this.usuarios = data.map(doc => ({ id: doc.payload.doc.id, ...doc.payload.doc.data() }));
      console.log('Datos obtenidos de Usuarios:', this.usuarios);
    })
  }

  // Eliminar usuario
  eliminarUsuario(usuarioEliminar: string) {
    //console.log("este es el usuario que recibe el metodo", usuarioEliminar);
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmar) {
      this.firebaseService
        .deleteItem('Usuarios', usuarioEliminar)
        .then(() => {
          console.log('Usuario eliminado con éxito', usuarioEliminar);
          alert('Usuario eliminado con éxito');
          this.usuarios = this.usuarios.filter((usuario) => usuario.id !== usuarioEliminar); // Actualizar lista
        })
        .catch((error) => {
          console.error('Error al eliminar el usuario:', error);
          alert('Error al eliminar el usuario:');
        });
    } else {
      console.log('Eliminación cancelada');
    }
  }

}
