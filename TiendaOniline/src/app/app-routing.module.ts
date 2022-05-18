import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarArticulosComponent } from './componentes/listar-articulos/listar-articulos.component';
import { MostrarArticuloComponent } from './componentes/mostrar-articulo/mostrar-articulo.component';
import { PaginaTiendaComponent } from './componentes/pagina-tienda/pagina-tienda.component';
import { PaginaCarritoComponent } from './componentes/pagina-carrito/pagina-carrito.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { HomeComponent } from './componentes/home/home.component';


const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'home'},
  {path: 'home', component: HomeComponent},
  {path: 'tienda', pathMatch:'full', redirectTo:'tienda/categoria/todos'},
  {path: 'tienda/categoria', pathMatch:'full', redirectTo:'tienda/categoria/todos/1'},
  {path: 'tienda/categoria/:categoria', pathMatch:'full', redirectTo:'tienda/categoria/todos/1'},
  {path: 'tienda/categoria/:categoria/:pag', component: PaginaTiendaComponent},
  {path: 'tienda/mostrar-articulo/:id', component: MostrarArticuloComponent},
  {path: 'carrito', component: PaginaCarritoComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'perfil', component: PerfilUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
