import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { CrearBlogComponent } from './components/blog/crear-blog/crear-blog.component';
import { EditarBlogComponent } from './components/blog/editar-blog/editar-blog.component';
import { TrashcanComponent } from './components/blog/trashcan/trashcan.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { QuillModule } from 'ngx-quill';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { DataService } from './services/data.service';
import { UIService } from './services/ui.service';
import { SearchEstudioPipe } from './components/pipes/search-estudio.pipe';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    CotizadorComponent,
    CrearBlogComponent,
    EditarBlogComponent,
    TrashcanComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    SearchEstudioPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    QuillModule.forRoot()
  ],
  providers: [DataService, UIService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
