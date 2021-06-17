import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calificacion'
})
export class CalificacionPipe implements PipeTransform {

  transform(value: any, arg: any): string {
    console.log(value);
    var retorno = ""
    switch (value) {
      case 0:
        retorno = "desaprobado";
        break;
      case 1:
        retorno = "desaprobado";
        break;
      case 2:
        retorno = "desaprobado";
        break;
      case 3:
        retorno = "desaprobado";
        break;
      case 4:
        retorno = "aprobado";
        break;
      case 5:
        retorno = "aprobado";
        break;
      case 6:
        retorno = "promocionado";
        break;
      case 7:
        retorno = "promocionado";
        break;
      case 8:
        retorno = "promocionado";
        break;
      case 9:
        retorno = "promocionado";
        break;
      case 10:
        retorno = "promocionado";
        break;
      default:
        retorno="Ocurrio un problema";
        break;
    }
    return retorno;
  }

}
