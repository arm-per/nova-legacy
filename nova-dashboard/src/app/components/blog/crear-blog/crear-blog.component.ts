import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PublicarService } from 'src/app/services/publicar.service';
import { FileItem } from 'src/app/models/file-item.model';
import { ObtenerService } from 'src/app/services/obtener.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-blog',
  templateUrl: './crear-blog.component.html',
  styleUrls: ['./crear-blog.component.scss']
})
export class CrearBlogComponent implements OnInit {

  configModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote'],
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      [{ header: [1, 2, false] }],
      [{ 'color': [] }, { 'background': [] }],
    ]
  };

  editorForm: FormGroup;
  htmlEditor: string = '';
  flagImage: boolean = false;

  imgTemp: File;
  imageUrl: string = './assets/drop-images.png';
  imagen: FileItem;

  buttonText: string = 'Publicar articulo';
  isEdit = false;
  postId = '';

  constructor( public sanitizer: DomSanitizer,
               private publicar: PublicarService,
               private obtener: ObtenerService,
               private activatedRoute: ActivatedRoute,
               private route: Router) {
      
    }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe( response => { 

      this.editorForm = new FormGroup({
        titulo: new FormControl(),
        editor: new FormControl(),
        categoria: new FormControl()
      });
      
      if (response.id) {
        this.isEdit = true;
        this.postId = response.id;
        this.obtener.getArticulo(response.id).subscribe((data: any) => {
          this.editorForm.setValue({
            titulo: data.titulo,
            editor: data.editor,
            categoria: data.categoria
          });
          this.imageUrl = data.imagen;
          this.buttonText = 'Actualizar articulo';
        });
      } 

    });

  }

  agregarImagen( event: any ) {
    this.imgTemp = event.target.files.item(0);
    const reader = new FileReader();
    reader.onload = ( event: any ) => { this.imageUrl = event.target.result; };
    reader.readAsDataURL( this.imgTemp );
    return ( event.target.files[0] === undefined && this.imagen !== undefined )
      ? this.imagen = this.imagen : this.imagen = new FileItem( event.target.files[0] );
  }

  editorActual( event: any ) {
    let htmlEditorTemp = event;
    if ( htmlEditorTemp !== null ) {
      if ( htmlEditorTemp.includes('<img ') ) {
        htmlEditorTemp = htmlEditorTemp.replace('<img src=', '<img class="img-fluid" src=');
      } else if ( htmlEditorTemp.includes('<iframe ') ) {
        htmlEditorTemp = htmlEditorTemp.replace('<iframe ', '<iframe width="100%" height="400px" ');
      }
    }
    this.htmlEditor = htmlEditorTemp;
  }

  onSubmit() {


    if (this.isEdit) {
      const imagen = !this.imagen ? this.imageUrl : this.imagen;
      this.publicar.updatePost(this.postId,{imagen: imagen, ...this.editorForm.value, fecha: Date.now(), status: 'active'} );
    } else {
      this.publicar.publicar({imagen: this.imagen, ...this.editorForm.value, comentarios: [], fecha: Date.now(), status: 'active'});
      
    }
    this.route.navigate(['/']);
    
  }

}
