import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';

import { ObtenerService } from './services/obtener.service';

import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { VideoComponent } from './components/video/video.component';
import { VerComponent } from './components/blog/ver/ver.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { SeoService } from './services/seo.service';

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'Tour of (lazy/busy) heroes',
    defaults: {
      title: 'Mighty mighty mouse',
      description: 'Mighty Mouse is an animated superhero mouse character',
      'og:image': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg',
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US,nl_NL,tr_TR'
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ContactoComponent,
    CotizadorComponent,
    FooterComponent,
    NavbarComponent,
    NosotrosComponent,
    PrincipalComponent,
    VideoComponent,
    VerComponent,
    DomseguroPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory)
    })
  ],
  providers: [Meta, ObtenerService, SeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
