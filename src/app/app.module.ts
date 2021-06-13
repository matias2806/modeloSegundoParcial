import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OpcionesDeUsuariosComponent } from './auth/opciones-de-usuarios/opciones-de-usuarios.component';
import { AltaMateriaComponent } from './components/materia/alta-materia/alta-materia.component';
import { ListadoProfesoresComponent } from './components/Profesores/listado-profesores/listado-profesores.component';
import { ListadoAlumnosComponent } from './components/Alumnos/listado-alumnos/listado-alumnos.component';
import { ListadoMateriasComponent } from './components/materia/listado-materias/listado-materias.component';
import { InscMateriaComponent } from './components/admin/inscMateria/insc-materia/insc-materia.component';
import { VerMatYalumnosComponent } from './components/inscriptos/verMateriasyAlum/ver-mat-yalumnos/ver-mat-yalumnos.component';
import { ListadoUsuariosComponent } from './components/usuarios/listadoUsuarios/listado-usuarios/listado-usuarios.component';
import { FiltroUsuariosPipe } from './pipes/filtro-usuarios.pipe';
import { InscMateriaAComponent } from './components/Alumnos/insc-materia-a/insc-materia-a.component';
import { VerMisInscripcionesComponent } from './components/Alumnos/ver-mis-inscripciones/ver-mis-inscripciones.component';
import { ListadoInscripcionesComponent } from './components/inscriptos/listado-inscripciones/listado-inscripciones.component';
import { ColorMateriasDirective } from './directive/color-materias.directive';


registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OpcionesDeUsuariosComponent,
    AltaMateriaComponent,
    ListadoProfesoresComponent,
    ListadoAlumnosComponent,
    ListadoMateriasComponent,
    InscMateriaComponent,
    VerMatYalumnosComponent,
    ListadoUsuariosComponent,
    FiltroUsuariosPipe,
    InscMateriaAComponent,
    VerMisInscripcionesComponent,
    ListadoInscripcionesComponent,
    ColorMateriasDirective,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireDatabaseModule,

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
