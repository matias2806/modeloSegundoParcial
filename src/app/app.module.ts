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

registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OpcionesDeUsuariosComponent,
   
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
