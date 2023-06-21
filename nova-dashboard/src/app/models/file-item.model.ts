export class FileItem {
    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number;

    constructor( archivo?: File ) {
        this.archivo = archivo;
        if ( archivo !== undefined ) {
            this.nombreArchivo = archivo.name;
            this.estaSubiendo = false;
            this.progreso = 0;
        }
    }
}
