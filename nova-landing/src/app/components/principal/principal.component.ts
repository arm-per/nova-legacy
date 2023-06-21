import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ObtenerService } from '../../services/obtener.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  public articulos: any[] = [];
  galleryImgs = [];

  constructor( private sanitizer: DomSanitizer,
              private obtener: ObtenerService ) { }

  ngOnInit() {
    this.obtener.getArticulos().subscribe( articulos => {
      for (let i = 0; i < articulos.length; i++) {
        if (i === 4) { break; }
        this.articulos.push(articulos[i]);
      }
    });
    this.galleryImgs = [
      "./assets/galeria/analisis.jpg",
      "./assets/galeria/resultados.jpg",
      "./assets/galeria/personal.jpg",
      "./assets/galeria/personal2.jpg",
      "./assets/galeria/personal3.jpg",
      "./assets/galeria/puntoguadiana1.jpg",
      "./assets/galeria/puntoguadiana2.jpg",
      "./assets/galeria/microscopio.jpg",
      "./assets/galeria/galeria6.jpg"
    ];
  }
  
  sanitize(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
