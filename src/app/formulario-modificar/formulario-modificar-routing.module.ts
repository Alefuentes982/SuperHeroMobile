import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioModificarPage } from './formulario-modificar.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioModificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioModificarPageRoutingModule {}
