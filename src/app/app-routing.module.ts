import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpcionesDeUsuariosComponent } from './auth/opciones-de-usuarios/opciones-de-usuarios.component';
import { InscMateriaComponent } from './components/admin/inscMateria/insc-materia/insc-materia.component';
import { AltaMateriaComponent } from './components/materia/alta-materia/alta-materia.component';
import { GAuthGuard } from './guards/g-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register/:tipoPerfil', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'tiposDeRegistros', component:  OpcionesDeUsuariosComponent },
  { path: 'altaAdmin',  loadChildren: () => import('./components/alta-administrador/alta-administrador.module').then(m => m.AltaAdministradorModule) },
  { path: 'altaMateria', component:  AltaMateriaComponent, canActivate:[GAuthGuard] },
  { path: 'inscMateria', component:  InscMateriaComponent, canActivate:[GAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
