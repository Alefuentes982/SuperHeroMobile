import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioModificarPageRoutingModule } from './formulario-modificar-routing.module';

import { FormularioModificarPage } from './formulario-modificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormularioModificarPageRoutingModule
  ],
  declarations: [FormularioModificarPage]
})
export class FormularioModificarPageModule { }
