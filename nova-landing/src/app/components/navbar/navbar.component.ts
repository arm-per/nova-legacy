import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import * as $ from 'jquery';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  isMenuOpen = false;

  constructor(private router: Router) { }

  ngOnInit() {
    let contador = 1;
    /*$('.menu_bar').click(function() {
      if (contador === 1) {
        $('nav').animate({
          left: '0'
        });
        contador = 0;
      } else {
        contador = 1;
        $('nav').animate({
          left: '-100%'
        });
      }
    });*/
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onClickHome() {
    this.toggleMenu();
    this.router.navigate(['/']);
  }

}
