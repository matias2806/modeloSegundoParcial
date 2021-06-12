import { Materia } from "./Materia";
import { Usuario } from "./Usuario";

export class InscripcionMateria {
    public id:string="";
    public nombre:string="";
    public cupoAlumnos:string="";
    public materia : Materia;
    public listaAlumnos : Usuario[];
}
