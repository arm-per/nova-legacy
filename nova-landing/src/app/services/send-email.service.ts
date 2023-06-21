import { Injectable } from '@angular/core';
import { ContactForm } from '../models/contacto.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
 
  constructor( private http: HttpClient ) { }

  getResponseEmail(_body: ContactForm): Observable<any>{
    const request = {name: _body.name, email:_body.email, subject: 'Comentarios', msn:_body.msn}; 
    return this.http.post('http://labnova.com.mx/nova/api/v1/mail/mailSender', request);
  }
}
