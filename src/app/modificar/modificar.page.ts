import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterFirebaseService } from '../services/register-firebase.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  public usuarios: any[] = []; // Lista de usuarios

  constructor(
    private firebaseService: RegisterFirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.firebaseService.getData('Usuarios').subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  irAFormulario(id: string) {
    this.router.navigate(['/modificar/formulario', id]);
  }
}
