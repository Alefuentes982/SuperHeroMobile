import { Component, OnInit } from '@angular/core';
import { RegisterFirebaseService } from '../services/register-firebase.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage {
  busqueda: string = '';
  error: string = '';
  apiKey: string = '4905856019427443'; // Clave de la API
  apiUrl: string = `https://superheroapi.com/api.php/${this.apiKey}`; // URL base de la API

  resultados: any = null; // Aquí se almacenan los datos del héroe

  constructor(private http: HttpClient) { }

  buscarSuperHeroe(): void {
    this.error = ''; // Limpia errores previos
    const searchTerm = this.busqueda.trim();

    // Validar si el input contiene solo números entre 1 y 731
    if (!/^\d+$/.test(searchTerm)) {
      window.alert('Por favor, ingresa solo números.');
      //this.error = 'Por favor, ingresa solo números.';
      return;
    } else if (parseInt(searchTerm) < 1 || parseInt(searchTerm) > 731) {
      window.alert('Debe ingresar un número entre el 1 y el 731.');
      //this.error = 'Debe ingresar un número entre el 1 y el 731.';
      return;
    }

    const url = `${this.apiUrl}/${searchTerm}`;
    console.log(`Consultando API: ${url}`);

    // Llamada HTTP para obtener datos del superhéroe
    this.http.get<any>(url).subscribe({
      next: (data) => {
        console.log('Datos obtenidos:', data);
        this.resultados = data; // Guarda los datos obtenidos
      },
      error: (err) => {
        console.error('Error al procesar la solicitud:', err);
        window.alert('Ocurrió un error al buscar el héroe. Inténtalo de nuevo.');
        //this.error = 'Ocurrió un error al buscar el héroe. Inténtalo de nuevo.';
      },
    });
  }
}
