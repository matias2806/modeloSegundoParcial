
export class Usuario {
    public nombre: string = ''; //Obli
    public foto: any; //Obli
    public email: string = ''; //Obli
    public contraseña: string = ''; //Obli
    public tipoPerfil: string | null = ''; //Obli
    public uid?: string;//Obli
    public URLfoto: any; //Obli
    public estado: string; //ACTIVO  -- BAJA
    public fechaBaja: Date | null; //ACTIVO  -- BAJA
}
