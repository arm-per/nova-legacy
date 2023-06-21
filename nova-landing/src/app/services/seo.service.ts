import { Injectable } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta) { }

  createTags(config: any) {
    config = {
      title: 'Nova Laboratorio Clínico',
      description: 'Realizamos mas de 350 estudios de rutina con la más alta tecnología. Convenio con los mejores laboratorios del país, para estudios de alta especialidad. A tu disposición 24/7 los 365 días del año, entrega de resultados, confiables, seguros y confidenciales',
      image: './assets/banner_nova.jpg',
      slug: '',
      ... config
    };

    //this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    //this.meta.updateTag({ name: 'twitter:site', content: '@MiTwitter' });
    //this.meta.updateTag({ name: 'twitter:title', content: config.title });
    //this.meta.updateTag({ name: 'twitter:description', content: config.description });
    //this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: `Nova Laboratorio Clínico | ${ config.title }` });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `http://www.labnova.com.mx/${config.slug}` });
  }
}
