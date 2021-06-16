import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of, Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from '../Models/Usuario';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GAuthGuard implements CanActivate {

  public user$: Observable<any> = this.authSvc.afAuth.user;
  public usuario: Usuario | null = null;

  constructor(private authSvc: AuthService, private _Uservice: UsuariosService, private router: Router){  }

  canActivate(): Observable<boolean> | boolean | Promise<boolean> {
    return this.conseguirUsuario();
       
  }

  async conseguirUsuario() : Promise<boolean>{
    var user = await this.authSvc.getCurrentUser();
    if (user?.email != null && user) {
      // console.log(user.email);
      var dataUser: any = await this._Uservice.getUsuarioPorEmail(user.email);
      // console.log(dataUser);
      if(dataUser.tipoPerfil == "Admin"){
        // console.log("Pasee");
        return true;
      }
      else{
        // console.log("No corresponde");
        this.router.navigate(['home']);
        return false;
      }
    }
    else{
      this.router.navigate(['home']);
    }
  }
  
}
