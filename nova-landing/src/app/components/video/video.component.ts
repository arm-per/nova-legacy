import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styles: []
})
export class VideoComponent implements OnInit {

  playlist = [{
    url_video: 'mwiPi_U1T0s',
    url_image: './assets/youtube/laboratorio.jpg',
  }, {
    url_video: 'aYPgS8OzfFk',
    url_image: './assets/youtube/anemia.jpg',
  }, {
    url_video: '9oDBfnQJmjw',
    url_image: './assets/youtube/influenza.jpg',
  }, {
    url_video: 'gawBZO_69Lw',
    url_image: './assets/youtube/vih.jpg',
  }, {
    url_video: 'y6bqXH-lYBo',
    url_image: './assets/youtube/resultados.jpg',
  }, {
    url_video: 'Jtxd4Yr_nvA',
    url_image: './assets/youtube/microscopio_artritis.jpg',
  }, {
    url_video: '7VmR9k4jlfE',
    url_image: './assets/youtube/aniversario.jpg',
  }, {
    url_video: 'U1MxUpZJQQ',
    url_image: './assets/youtube/visita_canal.jpg',
  }, {
    url_video: '7sb1Ec7_UC8',
    url_image: './assets/youtube/resultados_movil.jpg',
  }, {
    url_video: '4Ef3lW3IHM4',
    url_image: './assets/youtube/alzheimer.jpg',
  }];

  videoSelect: string = this.playlist[0].url_video;

  constructor() { }

  ngOnInit() { }

  videoClip(seleccion: number) {
    this.videoSelect = this.playlist[seleccion].url_video;
  }
}
