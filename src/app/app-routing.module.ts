import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpcionesDeUsuariosComponent } from './auth/opciones-de-usuarios/opciones-de-usuarios.component';
import { InscMateriaComponent } from './components/admin/inscMateria/insc-materia/insc-materia.component';
import { InscMateriaAComponent } from './components/Alumnos/insc-materia-a/insc-materia-a.component';
import { VerMisInscripcionesComponent } from './components/Alumnos/ver-mis-inscripciones/ver-mis-inscripciones.component';
import { VerMatYalumnosComponent } from './components/inscriptos/verMateriasyAlum/ver-mat-yalumnos/ver-mat-yalumnos.component';
import { AltaMateriaComponent } from './components/materia/alta-materia/alta-materia.component';
import { ListadoAlumnosPorMateriasComponent } from './components/Profesores/listado-alumnos-por-materias/listado-alumnos-por-materias.component';
import { ListadoMateriasACargoComponent } from './components/Profesores/listado-materias-acargo/listado-materias-acargo.component';
import { ListadoUsuariosComponent } from './components/usuarios/listadoUsuarios/listado-usuarios/listado-usuarios.component';
import { GAuthGuard } from './guards/g-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register/:tipoPerfil', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'tiposDeRegistros', component:  OpcionesDeUsuariosComponent },
  { path: 'altaAdmin',  loadChildren: () => import('./components/alta-administrador/alta-administrador.module').then(m => m.AltaAdministradorModule) },
  //Admin
  { path: 'altaMateria', component:  AltaMateriaComponent, canActivate:[GAuthGuard] },
  { path: 'inscMateria', component:  InscMateriaComponent, canActivate:[GAuthGuard] },
  { path: 'verMateriasyAlumnos', component:  VerMatYalumnosComponent, canActivate:[GAuthGuard] },
  { path: 'listadoUsuarios', component:  ListadoUsuariosComponent, canActivate:[GAuthGuard] },
  //Alumno
  { path: 'inscribirmeMateria', component:  InscMateriaAComponent },
  { path: 'verMisInscripciones', component:  VerMisInscripcionesComponent },

  //profesor
  { path: 'materiasACargo', component:  ListadoMateriasACargoComponent },
  { path: 'alumnosPorMateria', component:  ListadoAlumnosPorMateriasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
