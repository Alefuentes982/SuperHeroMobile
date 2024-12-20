import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterFirebaseService {

  private rolSubscription!: Subscription; // Variable para la suscripción

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { }

  actualizarContrasena(nuevaContrasena: string): Promise<void> {
    return this.afAuth.currentUser.then((user) => {
      if (user) {
        return user.updatePassword(nuevaContrasena);
      } else {
        throw new Error('No hay un usuario autenticado');
      }
    });
  }
  // Método para autenticar al usuario con Firebase Authentication
  iniciarSesion(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      const id = userCredential.user?.uid;
      console.log('ID del usuario autenticado:', id);
      email = "";
      password = "";
      if (id) {
        // Llamar al método para obtener el rol del usuario
        this.rolSubscription = this.obtenerRolUsuario(id).subscribe((rol) => {
          console.log('Rol obtenido del usuario:', rol);
          if (rol === 'admin') {

            this.router.navigate(['/administrador']);
          } else if (rol === 'usuario') {

            this.router.navigate(['/usuario']);
          } else {

            console.error('Rol desconocido');
            return;
          }
        });
      }
    })
      .catch((error) => {
        console.error('Error en autenticación:', error);
        email = '';
        password = '';
        alert('Usuario / contraseña inválida.');
      });
  }

  // Método para obtener el rol del usuario desde Firestore
  obtenerRolUsuario(id: string): Observable<string | null> {
    return this.firestore
      .collection('Usuarios').doc(id).snapshotChanges().pipe(map((doc) => {
        if (!doc.payload.exists) {
          console.error(`El documento con UID ${id} no existe en Firestore.`);
          return null;
        }
        const data = doc.payload.data() as any;
        console.log('Datos del usuario desde Firestore:', data);

        return data?.rol || null;
      })
      );
  }

  cerrarSesion(): void {
    this.afAuth.signOut().then(() => {
      console.log('Sesión cerrada correctamente.');

      // Cancela suscripciones activas
      if (this.rolSubscription) {
        this.rolSubscription.unsubscribe();
        console.log('Suscripción cancelada.');
      }

      // Redirige al login

      // Limpia otros estados si es necesario
      localStorage.clear(); // Opcional, limpia el almacenamiento local
      sessionStorage.clear(); // Limpia la sesión
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });

    this.router.navigate(['/login']);

  }



  // Agregar

  /*
  addItem(nombreColeccion: string, data: any): Promise<any> {
    console.log(`Intentando agregar a la colección: ${nombreColeccion}`, data); // Mensaje consola
    return this.firestore.collection(nombreColeccion).add(data);
  }
 */

  // Método para agregar datos a una colección en Firestore
  addItem(nombreColeccion: string, data: any): Promise<void> {
    console.log(`Agregando datos a la colección ${nombreColeccion}:`, data);
    return this.firestore.collection(nombreColeccion).add(data)
      .then(() => console.log('Datos agregados exitosamente'))
      .catch((error) => {
        console.error('Error al agregar datos:', error);
        throw error;
      });
  }

  // Método para crear un usuario en Firebase Authentication y registrar en Firestore
  crearUsuarioConAuth(email: string, password: string, datosUsuario: any): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid; // Obtener UID del usuario
        console.log('Usuario registrado en Authentication con UID:', uid);

        if (uid) {
          // Guardar solo los campos necesarios en Firestore
          const datosFirestore = {
            nombre: datosUsuario.nombre,
            apellido: datosUsuario.apellido,
            email: datosUsuario.email,
            password: password, // Guardar contraseña (solo si es necesario)
            rol: datosUsuario.rol,
          };

          return this.firestore.collection('Usuarios').doc(uid).set(datosFirestore);
        } else {
          throw new Error('No se pudo obtener el UID del usuario.');
        }
      })
      .then(() => {
        console.log('Datos guardados en Firestore correctamente.');
      })
      .catch((error) => {
        console.error('Error al crear usuario en Authentication o Firestore:', error);
        throw error;
      });
  }


  // Obtener datos - listar
  getData(usuarios: string): Observable<any[]> {
    console.log(`Obteniendo datos de la colección: ${usuarios}`); // Mensaje consola
    //console.log(`datos: ${usuarios}`); // Mensaje consola

    // return this.firestore.collection(usuarios).valueChanges();
    return this.firestore.collection(usuarios).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        if (!a.payload.doc.exists) {
          console.warn(`Documento inexistente: ${a.payload.doc.id}`);
          return null; // Maneja documentos inexistentes
        }
        const data = a.payload.doc.data() || {}; // Asegura que siempre sea un objeto
        const id = a.payload.doc.id;
        return { id, ...data }; // Combina el id con los datos
      }).filter(doc => doc !== null)) // Filtra los documentos nulos
    );
  }

  // Obtener datos por ID
  getId(usuarios: string, id: string) {
    return this.firestore.collection(usuarios).doc(id).get();
  }

  // Eliminar
  deleteItem(usuarios: string, id: string): Promise<void> {
    console.log(`Eliminando el usuario: ${id}`); // Mensaje consola
    return this.firestore.collection(usuarios).doc(id).delete();
  }

  updateItem(usuarios: string, id: string, data: any):
    Promise<void> {
    return this.firestore.collection(usuarios).doc(id).update(data)
      .then(() => console.log(`Usuario ${id} actualizado correctamente.`))
      .catch((error) => console.error('Error al actualizar usuario:', error));
  }


  // Método para cancelar la suscripción
  ngOnDestroy() {
    if (this.rolSubscription) {
      this.rolSubscription.unsubscribe();
      console.log('Suscripción cancelada.');
    }
  }
  //console.log(`Usuario modificado: ${id}`); // Mensaje consola
  //this.firestore.collection(usuarios).doc(id).set(data);
  //}


}
