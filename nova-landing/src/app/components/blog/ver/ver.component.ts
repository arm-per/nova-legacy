import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObtenerService } from '../../../services/obtener.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from '../../../services/seo.service';
import { NgForm } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { Meta, MetaDefinition } from '@angular/platform-browser';
@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styles: []
})
export class VerComponent implements OnInit {

  public ID_BLOG = '';

  public blogContent = {
    id: '',
    titulo: '',
    categoria: '',
    editor: '',
    fecha: '',
    imagen: '',
    comentarios: [] = []
  };

  public articulos: any[] = [];

  constructor(private obtener: ObtenerService,
              private sanitizer: DomSanitizer,
              public seo: SeoService,
              private active: ActivatedRoute,
              private blogService: BlogService,
              private metaService:Meta) {
    this.ID_BLOG = this.active.snapshot.paramMap.get('id');
    this.addTags();
  }

  addTags() {
    this.metaService.addTags([
      { name: 'description', content: 'Article Description' },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:title', content: 'Content Title for social media' }
   ]);
 }
  ngOnInit() {
    this.active.params.subscribe( url => {
      this.articulos = [];
      

      this.obtener.getArticulo(url.id)
      .subscribe( (data: any) => {
        this.blogContent = data;
        
       /* this.seo.createTags({
          title: this.blogContent.titulo,
          image: this.blogContent.imagen,
          slug: `blog/${ url.id }`
        });*/
        //this.metaService.addTag( { name:'og:title',content:this.blogContent.titulo});
       // this.metaService.addTag( { name:'og:image',content:this.blogContent.imagen});
       // this.metaService.addTag( { name:'og:description',content:'example description'});

        this.metaService.updateTag( { property:'og:title', content:this.blogContent.titulo},"property='og:title'");
        this.metaService.updateTag( { property:'og:image', content:this.blogContent.imagen},"property='og:image'");

      });
      this.obtener.getArticulos().subscribe( (articulos: any[]) => {
        this.articulos = [];
        for (let i = 0; i < articulos.length; i++) {
          if (i === 4) { break; }
          if ( articulos[i].id !== url.id ) {
            this.articulos.push(articulos[i]);
          }
        }
      });
    });
  }

  onComment(comment: NgForm) {
    this.blogContent.comentarios.push({comentario: comment.form.value.comment, userName: comment.form.value.userName, email: comment.form.value.email});
    this.blogService.updatePost(this.ID_BLOG, this.blogContent);   
    comment.reset(); 
  }

  sanitize(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
