import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {

    isAuthenticated = false;
    userUID = '';
    authChange = new Subject<boolean>();

    constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
        
    }

    login(email: string, password: string) {
        return this.angularFireAuth.signInWithEmailAndPassword(email, password);
            
      } 
    
      singOut() {
          this.isAuthenticated = false;
          this.angularFireAuth.signOut().then( response => {
              this.router.navigate(['/']);
          });
      }
    
      initAuthListener() {
        this.angularFireAuth.authState.subscribe( user => {
            if (user) { 
                this.userUID = user.uid;
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/']);
                setTimeout(()=> { 
                    this.singOut();
                 }, 60000*30);
                
            } else { 
                this.isAuthenticated = false;

                this.userUID = '';
                this.authChange.next(false); 
                this.angularFireAuth.signOut().then( response => { 
                    this.router.navigate(['/']);
                });
                
            }
        });
    }

    isAuth() {
        return this.isAuthenticated;
    }
}