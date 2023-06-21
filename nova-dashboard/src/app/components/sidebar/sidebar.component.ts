import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UIService } from 'src/app/services/ui.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  openBlogMenu = false;
  numOfBlogs = 0;
  toggle = false;

  constructor(private uiService: UIService, private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
    
    this.uiService.toggleMenuChanged.subscribe( toggle => {
      this.toggle = toggle;
    });
    this.dataService.getAllArticulos().subscribe(articulos => { 
      this.numOfBlogs = articulos.length;
    })
    //this.numOfBlogs = this.dataService.getArticulosLength();

  }

  isAuth() {
    return this.authService.isAuth();
  }
  
  onLogout() {
    this.uiService.mensajeDeConfirmacion('Estar por cerrar tu sesión','warning','Deseas continuar?','Cerrar').then( response => {
      if (response && response.isConfirmed ) {
        this.authService.singOut();    
      }
    })
    
  }

  toggleSubMenu() {
    this.openBlogMenu = !this.openBlogMenu;
  }

}
