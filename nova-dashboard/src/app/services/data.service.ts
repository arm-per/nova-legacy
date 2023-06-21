import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Estudio } from '../models/estudio.model';

@Injectable()
export class DataService {

    estudios: any[] = [];
    estudiosChanged = new Subject<any>();

    constructor(private angularFirestore: AngularFirestore) {
        this.getEstudiosFromDB();
     }

    getArticulos(status = 'active') {
        return this.angularFirestore.collection('nova',
        ref => ref.where('status', '==', status))
        .snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data:any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
      }
    
      getArticulo(id: string) {
        return this.angularFirestore.collection('nova').doc(id)
        .snapshotChanges().pipe(
          map(a => {
            const data:any = a.payload.data();
            const id = a.payload.id;
            return { id, ...data };
        }));
      }

      updatePost(id: string, post: any) {
        this.angularFirestore.collection('nova').doc(id).set(post).then( result => {
         
        });
      }

      getEstudiosFromDB() {
        this.angularFirestore.collection('nova_cotizador').snapshotChanges().pipe( map(products => {
          return products.map(data => {
            const id = data.payload.doc['id'];
            const estudio:any = data.payload.doc.data();
            return {id, ...estudio};
          })
        })).subscribe( (response:any) => {
          this.estudios = response;
          this.estudiosChanged.next(this.estudios);
        })
      }

      onAddEstudio(estudio: Estudio) {
  
        this.angularFirestore.collection('nova_cotizador').doc(estudio.id).set({...estudio}).then( result => {
      
        });
      }

      onDeleteEstudio(estudioId: string) {
          this.angularFirestore.collection('nova_cotizador').doc(estudioId).delete().then( result => {
            
          })
      }

      getEstudiosArray() {
        return this.estudios.slice();
        //return this.http.get<any[]>(this.URL_ESTUDIOS);
      }

      getAllArticulos() {
        return this.angularFirestore.collection('nova').snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
      }

      getNewId() {
          return this.angularFirestore.createId();
      }
}