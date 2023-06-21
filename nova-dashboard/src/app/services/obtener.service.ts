import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ObtenerService {

  constructor(private angularFirestore: AngularFirestore) { }

  getActiveArticulos(status = 'active') {
    return this.angularFirestore.collection('nova',
    ref => ref.where('status', '==', status))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: any = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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

  getArticulo(id: string) {
    return this.angularFirestore.collection('nova').doc(id)
    .snapshotChanges().pipe(
      map(a => {
        const data: any = a.payload.data();
        const id = a.payload.id;
        return { id, ...data };
    }));
  }
}
