import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { VerComponent } from './components/blog/ver/ver.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';

const routes: Routes = [
    { path: '', component: PrincipalComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'blog', component: BlogComponent, },
    { path: 'blog/:id', component: VerComponent},
    { path: 'cotizador', component: CotizadorComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
