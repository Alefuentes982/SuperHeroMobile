import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RegisterFirebaseService } from '../services/register-firebase.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit, OnDestroy {

  usuarios: any[] = []; //lista para traer los datos de los usuarios registrados
  private dataSubscription!: Subscription;

  constructor(private router: Router,
    private navCtrl: NavController,
    //private firebaseService: RegisterFirebaseService
    private firebaseService: RegisterFirebaseService
  ) { }

  ngOnInit() {
    // traer los datos de la tabla
    this.dataSubscription = this.firebaseService.getData('Usuarios').subscribe((data) => {
      this.usuarios = data;
      console.log('Datos obtenidos de Usuarios:', this.usuarios);
    })

  }

  ngOnDestroy() {
    // Cancela la suscripción al destruir el componente
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log('Suscripción cancelada en ListarPage.');
    }


  }
}
