import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../Models/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  public usuariosAccesoRapido: any[] = [];

  constructor(private AuthSvc: AuthService, private router: Router, private _Uservice: UsuariosService, private _Mservice: MensajesService) {
    this.carga5usuarios();
    // console.log(this.usuariosAccesoRapido);
   }

  ngOnInit(): void {
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    //console.log('form ->',this.loginForm.value);
    try {
      const user = await this.AuthSvc.login(email, password);
      if(user){
        //Redirect to home page
        this.router.navigate(['/home']);
      }
      else{
        
        this._Mservice.mensajeError("El email y la contraseña no corresponden");
      }
    } catch (error) {
      console.log("aa", error);
      //this._Mservice.mensajeError(error);
    }
  }
  cargarMatias() {
    this.loginForm.setValue({ email: 'matias.palmieri.01@gmail.com', password: '123456' });
  }

  cargaUsuario(nombre: string) {
    switch (nombre) {
      case "alumnoA":
        this.loginForm.setValue({ email: 'alumnoa@gmail.com', password: '123456' });
        break;
      case "profesorB":
        this.loginForm.setValue({ email: 'profesorb@gmail.com', password: '123456' });
        break;
      case "Facundo":
        this.loginForm.setValue({ email: 'facundo.palmieri.01@gmail.com', password: '123456' });
        break;
      case "Lorena":
        this.loginForm.setValue({ email: 'lorena.bevilacqua75@gmail.com', password: '123456' });
        break;
        case "admin":
        this.loginForm.setValue({ email: 'admin@gmail.com', password: '123456' });
        break;
      default:
        break;
    }
  }

  carga5usuarios() {

    this._Uservice.getUsuarioPorEmail("facundo.palmieri.01@gmail.com").then(user => {
      if (user) {
        this.usuariosAccesoRapido?.push(user);
      }
    });

    this._Uservice.getUsuarioPorEmail("lorena.bevilacqua75@gmail.com").then(user => {
      if (user) {
        this.usuariosAccesoRapido?.push(user);
      }
    });

    this._Uservice.getUsuarioPorEmail("profesorb@gmail.com").then(user => {
      if (user) {
        this.usuariosAccesoRapido?.push(user);
      }
    });

    this._Uservice.getUsuarioPorEmail("alumnoa@gmail.com").then(user => {
      if (user) {
        this.usuariosAccesoRapido?.push(user);
      }
    });

    this._Uservice.getUsuarioPorEmail("admin@gmail.com").then(user => {
      if (user) {
        this.usuariosAccesoRapido?.push(user);
      }
    });
  }
}
