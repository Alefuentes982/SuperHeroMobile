import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterFirebaseService } from '../services/register-firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import AngularFireAuth

@Component({
  selector: 'app-formulario-modificar',
  templateUrl: './formulario-modificar.page.html',
  styleUrls: ['./formulario-modificar.page.scss'],
})
export class FormularioModificarPage implements OnInit {

  public modificarForm: FormGroup;
  private userId: string = ''; // ID del usuario a modificar
  isEmailDisabled: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private firebaseService: RegisterFirebaseService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    // Inicializar el formulario
    this.modificarForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['usuario'],
      password: ['usuario'],
    });

  }

  toggleRol(event: any) {
    const nuevoRol = event.detail.checked ? 'admin' : 'usuario';
    this.modificarForm.patchValue({ rol: nuevoRol });
    console.log('Rol seleccionado:', nuevoRol);
  }

  ngOnInit() {
    // Obtener el ID del usuario desde la URL
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.cargarDatos();
    }
  }

  cargarDatos() {

    this.firebaseService.getData('Usuarios').subscribe(
      (usuarios) => {
        const usuario = usuarios.find((u) => u.id === this.userId);
        if (usuario) {
          this.modificarForm.patchValue({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: usuario.password,
            rol: usuario.rol || 'usuario', // Asignar rol desde Firestore
          });
        } else {
          console.error('Usuario no encontrado');
        }
      },
      (error) => {
        console.error('Error al cargar datos del usuario:', error);
      }
    );
  }

  guardarCambios() {
    if (this.modificarForm.valid) {
      const datosActualizados = this.modificarForm.value;
      this.firebaseService.updateItem('Usuarios', this.userId, datosActualizados).then(() => {
        console.log('Usuario actualizado correctamente.');
        alert("Usuario actualizado correctamente");
        this.router.navigate(['/modificar']); // Volver al listado de usuarios
      }).catch((error) => {
        console.error('Error al actualizar usuario:', error);
      });
    }
  }

}
