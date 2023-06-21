import { Component, OnInit } from '@angular/core';
import { ObtenerService } from 'src/app/services/obtener.service';
import { PublicarService } from 'src/app/services/publicar.service';
import { UIService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trashcan',
  templateUrl: './trashcan.component.html',
  styleUrls: ['./trashcan.component.scss']
})
export class TrashcanComponent implements OnInit {

  archiveArticulos: any[] = [];
  totalArtArchive = 0;

  constructor(private obtener: ObtenerService,
              private publicar: PublicarService,
              private uiService: UIService,
              private router: Router ) {
  }

  ngOnInit() {
    this.getArticulos();
  }

  private getArticulos() {
    this.obtener.getAllArticulos().subscribe(data => {
      this.archiveArticulos = [];
      this.totalArtArchive = 0;
      let articulos = data;
      
      articulos.map( articulo => {
        if (articulo.status === 'trash') {
          this.totalArtArchive++;
          this.archiveArticulos.push(articulo);
        } 
      })
    });
  }

  editStatus( status: string, id: string, articulo: any) {
    switch (status) {
      case 'restore': {
        this.uiService.mensajeDeConfirmacion('Restaurando articulo, desea continuar?','question', '','Publicar').then(
          response => {
            if (response.isConfirmed) {
              articulo.status = 'active';
              this.publicar.restaurarPost( id );
            }
          })
        break;
      }
      case 'delete': {
        this.uiService.mensajeDeConfirmacion('Eliminar para siempre, no lo podras recuperar.','question', '¿Desea continuar?','Si, eliminar').then(
          response => {
            if (response.isConfirmed) {
              this.publicar.eliminarPost( id, articulo.imagen );
              
              this.getArticulos();
            }
          })
        
        break;
      }
      case 'view': console.log('v:', id); break;
    }
  }

}
