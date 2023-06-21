import { Component, OnInit } from '@angular/core';
import { ContactForm } from '../../models/contacto.model';
import { SendEmailService } from '../../services/send-email.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styles: []
})
export class ContactoComponent implements OnInit {

  ContactModel = new ContactForm();

  constructor(private sendServices: SendEmailService) { }

  ngOnInit() {
  }

  sendContacto(contactForm: NgForm) {
    this.getSentServices(contactForm);
  }

  getSentServices(contactForm: NgForm){ 
    this.sendServices.getResponseEmail(contactForm.value).subscribe(
      data => { 
        if(data){
          window.alert("Gracias por contactarnos.")
          contactForm.reset();
        }
        else{
          window.alert("No se pudo contactar con nova.")
        }
      },
      err => { 
        if(err['status'] === 200) {
          window.alert("Gracias por contactarnos.")
          contactForm.reset();
        } 
      }
    );
  }

}
