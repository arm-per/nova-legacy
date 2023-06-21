import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { UIService } from './ui.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class PublicarService {
  private PATH_CURSO_IMG = 'nova/portadas_articulos';
  private PATH_FIREBASE = 'https://other-services-dos17.firebaseio.com/';
  protected actual: Date;

  constructor(private angularFirestore: AngularFirestore, 
              private uiService: UIService, 
              private angularFireStorage: AngularFireStorage) { }

  publicar( post: any, actualiza?: string ) {
    const ID = this.angularFirestore.createId();
    const uploadTask: firebase.storage.UploadTask =
    firebase.storage().ref().child( `${ this.PATH_CURSO_IMG }/${ ID }/${ post.imagen.nombreArchivo }` )
    .put( post.imagen.archivo );
    console.log('post', post);
    uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
      ( snapshot ) => post.imagen.archivo.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes * 100 ),
      ( error ) => {
        // this.alert.error('Error al publicar post', error.message);
        console.error('Error al subir imagen', error.message);
      },
      ( ) => {
        uploadTask.snapshot.ref.getDownloadURL()
        .then( downloadURL => {
          post.imagen = downloadURL;
        }).finally( () => {
          let status: any;
          if ( actualiza ) {
            status = this.angularFirestore.collection<any>( 'nova' ).doc( actualiza ).set( post );
          } else {
            status = this.angularFirestore.collection<any>( 'nova' ).doc( ID ).set( post );
          }
          status.then( () => {
            this.uiService.normal('Articulo publicado','Tu articulo se ha publicado correctamente', 'success');
           
          }).catch( error => {
            // this.alert.error('Error al publicar curso', error.message);
            console.error('El contenido es demasiado grande', error.message);
          });
        });
      }
    );
  }

  updatePost(id: string, post: any) {
    if (post.imagen.archivo) {
      this.publicar(post, id);
    } else {
      this.angularFirestore.collection('nova').doc(id).set(post).then( result => {
        this.uiService.normal('Articulo actualizado','Tu articulo se ha actualizado correctamente', 'success');
      });
    }
    
  }

  removerPost( id: string ) {
    this.angularFirestore.collection('nova').doc( id )
    .update({status: 'trash'})
    .then( status => {
      this.uiService.normal('Articulo Removido', 'Se ha removido el articulo');
    })
    .catch( err => {
      console.log('Error:' + err);
    });
  }

  restaurarPost( id: string ) {
    this.angularFirestore.collection('nova').doc( id )
    .update({status: 'active'})
    .then( status => {
      this.uiService.normal('Articulo Rrestaurado', 'Se ha restaurado el articulo');
    })
    .catch( err => {
      console.log('Error:' + err);
    });
  }

  eliminarPost( id: string , imgUrl: string) {
    this.angularFireStorage.storage.refFromURL(imgUrl).delete().then(
      response => {
        this.angularFirestore.collection('nova').doc( id ).delete();
        this.uiService.normal('Eliminado exitosamente', 'Tu articulo se ha destruido');
      }
  ).catch(error => {
    console.error('error guardando cambios');
      //this.uiService.error('Error al guardar evaluacion de actividad', error.message);
  })
   
  }

}
