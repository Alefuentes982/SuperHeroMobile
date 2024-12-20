import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarPage } from './modificar.page';
import { FormularioModificarPage } from '../formulario-modificar/formulario-modificar.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarPage,
  },
  {
    path: 'formulario/:id',
    component: FormularioModificarPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarPageRoutingModule { }
