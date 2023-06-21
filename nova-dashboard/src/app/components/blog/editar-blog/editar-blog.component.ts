import { Component, OnInit } from '@angular/core';
import { ObtenerService } from 'src/app/services/obtener.service';
import { PublicarService } from 'src/app/services/publicar.service';
import { Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-editar-blog',
  templateUrl: './editar-blog.component.html',
  styleUrls: ['./editar-blog.component.scss']
})
export class EditarBlogComponent implements OnInit {

  public articulos: any[] = [];
  activeArticulos: any[] = [];
  totalArticulos = 0;
  totalArtPublicados = 0;
  totalArtArchive = 0;

  constructor(private obtener: ObtenerService,
              private publicar: PublicarService,
              private uiService: UIService,
              private router: Router ) {
  }

  ngOnInit() {
    this.obtener.getAllArticulos().subscribe(data => {
      
      this.totalArtPublicados = 0;
      this.totalArtArchive = 0;
      this.articulos = data;
      this.activeArticulos = [];
      
      this.totalArticulos = this.articulos.length;
      this.articulos.map( articulo => {
        if (articulo.status === 'active') {
          this.totalArtPublicados++;
          this.activeArticulos.push(articulo);
        } else {
          this.totalArtArchive++;
        }
      })

 
    });
  }

  editStatus( status: string, id: string, articulo: any) {
    switch (status) {
      case 'edit': {
        this.router.navigate(['/edit', id]);
        break;
      }
      case 'delete': {
        this.uiService.mensajeDeConfirmacion('¿Desea eliminar este articulo?','question', 'Esta por eliminar este articulo, puede recuperarlo en el basusero','Si, eliminar').then(
          response => {
            if (response.isConfirmed) {
              articulo.status = 'trash';
              this.publicar.removerPost( id );
            }
          })
        
        break;
      }
      case 'view': console.log('v:', id); break;
    }
  }

}
