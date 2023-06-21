import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { pipe, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerService {

  private URL_ESTUDIOS: string = `https://other-services-dos17.firebaseio.com/nova/cotizador.json`;
  private estudios: any[] = [];
  estudiosChanged = new Subject<any>();

  constructor(private angularStorage: AngularFirestore,
              private http: HttpClient) {
    this.getEstudiosFromDB();                
              }

  getArticulos(status = 'active') {
    return this.angularStorage.collection('nova',
    ref => ref.where('status', '==', status))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: any = a.payload.doc.data();
        const id = a.payload.doc.id;
        const url = `${this.changeSpace(data.categoria)}/${this.changeSpace(data.titulo)}`;
        return { id, ...data, url };
      }))
    );
  }

  getArticulo(id: string) {
    return this.angularStorage.collection('nova').doc(id)
    .snapshotChanges().pipe(
      map(a => {
        const data:any = a.payload.data();
        const id = a.payload.id;
        return { id, ...data };
    }));
  }

  changeSpace( text: string ) {
    return (text) ? text.replace(/ /g, '_').toLowerCase() : '';
  }

  getEstudiosFromDB() {
    this.angularStorage.collection('nova_cotizador').snapshotChanges().pipe( map(products => {
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
  getEstudiosArray() {
    return this.estudios.slice();
    //return this.http.get<any[]>(this.URL_ESTUDIOS);
  }
}
