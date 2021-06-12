import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpcionesDeUsuariosComponent } from './auth/opciones-de-usuarios/opciones-de-usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register/:tipoPerfil', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'tiposDeRegistros', component:  OpcionesDeUsuariosComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
