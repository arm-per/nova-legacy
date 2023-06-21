import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UIService } from 'src/app/services/ui.service';
import { Estudio } from 'src/app/models/estudio.model';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.scss']
})
export class CotizadorComponent implements OnInit {

  estudios: Estudio[] = [];
  query = '';

  constructor(private dataService: DataService, private uiService: UIService) { }

  ngOnInit(): void {
    this.dataService.estudiosChanged.subscribe( response => {
      this.estudios = response;
    });
    this.estudios = this.dataService.getEstudiosArray();
  }

  onAddNew() {
    this.uiService.addNewEstudio().then( response => {
      if (response.isConfirmed) {
        const estudio = new Estudio();
        estudio.id = this.dataService.getNewId();
        estudio.nombre = response.value[0];
        estudio.condiciones = response.value[1];
        // tslint:disable-next-line:radix
        estudio.precio = parseInt(response.value[2]);
        this.uiService.mensajeDeConfirmacion('¿En verdad quiere guardar este estudio?','warning', 'Una ves editado no se podran recuperar cambios', 'Si, Guardar')
          .then( response => {
            if (response) {
              this.dataService.onAddEstudio(estudio);
            }
          });
      }
    });
  }

  onEdit(estudio: Estudio) {
    this.uiService.addNewEstudio(estudio.nombre, estudio.condiciones, estudio.precio).then( response => {
      if (response.isConfirmed) {

        let newEstudio = new Estudio();
        newEstudio.id = estudio.id;
        newEstudio.nombre = response.value[0];
        newEstudio.condiciones = response.value[1];
        newEstudio.precio = response.value[2];
        this.uiService.mensajeDeConfirmacion('¿En verdad quiere actualizar este estudio?','warning', 'Una vez editado no se podran recuperar cambios', 'Si, Guardar')
          .then( response => {
            if (response) {
              this.dataService.onAddEstudio(newEstudio);
            }
          });
      }
    });
  }

  onDelete(estudioId: string) {
    this.uiService.mensajeDeConfirmacion('¿En verdad quiere borrar este estudio?', 'warning', 'Una vez borrado no se podran recuperar cambios', 'Si, Borrar')
      .then( response => {
        if (response) {
          this.dataService.onDeleteEstudio(estudioId);
        }
      });
  }
}
