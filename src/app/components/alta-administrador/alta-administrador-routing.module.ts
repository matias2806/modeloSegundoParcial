import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaAdministradorComponent } from './alta-administrador.component';

import { GAuthGuard } from 'src/app/guards/g-auth.guard';

const routes: Routes = [
  { path: '', component: AltaAdministradorComponent , canActivate:[GAuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaAdministradorRoutingModule { }
