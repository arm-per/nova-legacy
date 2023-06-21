import { Component, OnInit } from '@angular/core';
import { ObtenerService } from '../../services/obtener.service';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styles: []
})
export class BlogComponent implements OnInit {

  public articulos: any[] = [];

  constructor(public obtener: ObtenerService,
              public router: Router) { }

  ngOnInit() {

    this.obtener.getArticulos().subscribe(articulos => {
      this.articulos = articulos;
    });
  }

}
