import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {

  toggleMenu = false;
  toggleMenuChanged = new Subject<boolean>();
  constructor() { }

  normal( title: string, content: string, type?:any) {
		return Swal.fire({
            title: title,
            text: content,
            icon: type
        });
  }  

  async addNewEstudio(nombre: string = '', condicion: string = '', precio: number = 0) { 
        return Swal.fire({
             title: 'Agregar un nuevo estudio',
             html:
             `<input id="nombre" type="text" placeholder="Nombre del estudio" class="form-control my-2" value='${nombre}' >` +
             `<input id="condicion" type="text" placeholder="Condiciones para estudio" class="form-control my-2" value='${condicion}'>` +
             `<input id="precio" type="number" placeholder="Nombre del estudio" class="form-control my-2" value='${precio}'>`,
             showCancelButton: true,
             confirmButtonText: 'Guardar',
             preConfirm: () => {
                return [
                  document.getElementById('nombre')['value'],
                  document.getElementById('condicion')['value'],
                  document.getElementById('precio')['value']
                ]
              }
         });
  }  

  mensajeDeConfirmacion( title: string, type: any = 'question', content?: string, buttonText:string ='Guardar' ) {
    return Swal.fire({
        title: title,
        text: content,
        icon: type,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: buttonText,
        cancelButtonText: 'Cancelar',
    });
  }  

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
    this.toggleMenuChanged.next(this.toggleMenu);
  }
    
}