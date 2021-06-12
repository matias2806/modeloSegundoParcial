import { Usuario } from "./Usuario";

export class Materia {
    public id:string="";
    public nombre:string="";
    public cuatrimestre:string="";
    public cupoAlumnos:string="";
    public anio:string="";
    public profesor:Usuario;    
}
