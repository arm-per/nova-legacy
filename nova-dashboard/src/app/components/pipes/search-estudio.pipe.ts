import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'estudioFilter',
    pure: false
})
export class SearchEstudioPipe implements PipeTransform {
    transform(estudios: any[], query:string): any {
        if(!estudios || query.length <= 0) {
            return estudios;
        }
        return estudios.filter(estudio => { 
            return  (estudio.nombre.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
                    (estudio.condiciones.toLowerCase().indexOf(query.toLowerCase()) !== -1) //||
                    //(estudio.precio.indexOf(query.toLowerCase()) !== -1)
        });
    }
}