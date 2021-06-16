import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../../Models/Usuario';
import { AuthService } from '../../auth/service/auth.service';
import { map, finalize } from 'rxjs/operators';



@Component({
  selector: 'app-alta-administrador',
  templateUrl: './alta-administrador.component.html',
  styleUrls: ['./alta-administrador.component.scss']
})
export class AltaAdministradorComponent implements OnInit {

 
  public registerForm: FormGroup | undefined;
  private foto: any | null = null;

  constructor(private fb: FormBuilder, private AuthSvc: AuthService, private router: Router, private _Uservice: UsuariosService, private _Mservice: MensajesService) { }


  ngOnInit(): void {

    this.registerForm = this.fb.group({
      'nombre': ['', [Validators.required]],//Obli
      'foto': ['', [Validators.required]],//Obli
      'email': ['', [Validators.required]],//Obli
      'contraseña': ['', [Validators.required, Validators.minLength(6)]],//Obli
    });
  }

  async onRegister() {
    var urlFoto="";
    const { email, contraseña } = this.registerForm?.value;
    try {
      this.AuthSvc.register(email, contraseña).then((r) => {
        console.log(r?.user?.uid);
        
        let user: Usuario = {
          nombre: this.registerForm?.controls['nombre'].value,
          foto: this.registerForm?.controls['foto'].value,
          tipoPerfil: "Admin",
          email: this.registerForm?.controls['email'].value,
          contraseña: this.registerForm?.controls['contraseña'].value,
          uid: r?.user?.uid,
          URLfoto: urlFoto,
          estado: "ACTIVO",
          fechaBaja: null,
        };

        this._Uservice.preGuardarUsuario(user, this.foto);
      });

      this._Mservice.mensajeExitoso("Admin dado de alta");
      this.router.navigate(['/home']);

    } catch (error) {
      console.log(error);
    }
  }

  nuevaImagen(event: any): void {
    this.foto = event.target.files[0];
  }

  CargaDatos() {
    this.registerForm?.controls['nombre'].setValue('Matias Palmieri');
    this.registerForm?.controls['email'].setValue('matias.palmieri.01@gmail.com');
    this.registerForm?.controls['contraseña'].setValue('123456');
  }

  veoForm() {
    console.log(this.registerForm);
  }

}
