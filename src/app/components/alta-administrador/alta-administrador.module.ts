import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AltaAdministradorRoutingModule } from './alta-administrador-routing.module';
import { AltaAdministradorComponent } from './alta-administrador.component';
import { ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [AltaAdministradorComponent],
  imports: [
    CommonModule,
    AltaAdministradorRoutingModule,
    ReactiveFormsModule
  ]
})
export class AltaAdministradorModule { }
