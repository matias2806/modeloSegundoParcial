import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuarios'
})
export class FiltroUsuariosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost= [];

    for(const user of value){
      if(user.tipoPerfil.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPost.push(user);
      }else{
        if(user.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
          resultPost.push(user);
        }
      }
    }
    return resultPost
  }

}
