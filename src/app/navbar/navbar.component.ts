import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public usuario: any = null;

  us2: any;
  cambio: boolean = true;
  constructor(public authSvc: AuthService, private _Uservice: UsuariosService, private router: Router) {
  }

  async ngOnInit() {
    this.user$.subscribe(async r => {
      if (r && r.email != null ) {
        var dataUser = await this._Uservice.getUsuarioPorEmail(r.email);
        this.usuario = dataUser;
      }
    });
  }

  async onLogout() {

    try {
      await this.authSvc.logout();
      this.router.navigate(['/login'])
    } catch (error) {
      console.log(error);
    }
  }
}
