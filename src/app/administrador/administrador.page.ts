import { Component, OnInit } from '@angular/core';
import { RegisterFirebaseService } from '../services/register-firebase.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  constructor(private authService: RegisterFirebaseService) { }


  // Método para salir
  onLogout(): void {
    this.authService.cerrarSesion();
  }
  ngOnInit() {
  }

}
