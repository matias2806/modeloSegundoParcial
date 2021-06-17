import { InscripcionMateria } from "./InscripcionMateria";
import { Materia } from "./Materia";
import { Usuario } from "./Usuario";

export class Examen {
    public id:string="";
    public nota: number = 1;
    public fecha: Date;
    public profesor : Usuario;
    public materia : Materia;
    public alumno : Usuario;
    public inscripcion : InscripcionMateria;
}
