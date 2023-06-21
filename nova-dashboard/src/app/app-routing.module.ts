import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearBlogComponent } from './components/blog/crear-blog/crear-blog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditarBlogComponent } from './components/blog/editar-blog/editar-blog.component';
import { TrashcanComponent } from './components/blog/trashcan/trashcan.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './components/auth/auth.guard';


const routes: Routes = [
  /*{path:'', component: DashboardComponent, children: 
    [
      { path:'', component: EditarBlogComponent},
      { path:'edit/:id', component: CrearBlogComponent},
      { path:'nuevo', component: CrearBlogComponent},
      {path:'articulos', component: EditarBlogComponent},
      { path:'basura', component: TrashcanComponent},
      {path:'cotizador', component: CotizadorComponent},
  ]},*/

  { path:'', component: EditarBlogComponent, canActivate:[AuthGuard]},
      { path:'edit/:id', component: CrearBlogComponent, canActivate:[AuthGuard]},
      { path:'nuevo', component: CrearBlogComponent, canActivate:[AuthGuard]},
      {path:'articulos', component: EditarBlogComponent, canActivate:[AuthGuard]},
      { path:'basura', component: TrashcanComponent, canActivate:[AuthGuard]},
      {path:'cotizador', component: CotizadorComponent, canActivate:[AuthGuard]},
      {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
