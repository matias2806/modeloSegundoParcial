import { Materia } from "./Materia";
import { Usuario } from "./Usuario";

export class InscripcionMaterias {
    public id:string="";
    public cupoAlumnos:string="";
    public materia : Materia;
    public listaAlumnos : Usuario[];
}
