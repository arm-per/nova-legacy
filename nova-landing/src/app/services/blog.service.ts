import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  URL_SERVICE = "https://other-services-dos17.firebaseio.com";

  constructor(private http: HttpClient, private angularFirestore: AngularFirestore) { }

  getPost() {
    this.http.get(`${this.URL_SERVICE}/nova/blog.json`).subscribe( blog => {
     
    });
  }

  updatePost(id: string, post: any) {
    this.angularFirestore.collection('nova').doc(id).set(post).then( result => {
      
    });
  }

}
