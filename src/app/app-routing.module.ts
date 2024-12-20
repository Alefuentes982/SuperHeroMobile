import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./agregar/agregar.module').then(m => m.AgregarPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./modificar/modificar.module').then(m => m.ModificarPageModule)
  },
  {
    path: 'listar',
    loadChildren: () => import('./listar/listar.module').then(m => m.ListarPageModule)
  },
  {
    path: 'eliminar',
    loadChildren: () => import('./eliminar/eliminar.module').then(m => m.EliminarPageModule)
  },
  {
    path: 'formulario-modificar',
    loadChildren: () => import('./formulario-modificar/formulario-modificar.module').then(m => m.FormularioModificarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
