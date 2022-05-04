import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarArticulosComponent } from './componentes/listar-articulos/listar-articulos.component';
import { EditarArticulosComponent } from './componentes/editar-articulos/editar-articulos.component';
import { MostrarArticuloComponent } from './componentes/mostrar-articulo/mostrar-articulo.component';
import { PaginaTiendaComponent } from './componentes/pagina-tienda/pagina-tienda.component';
import { PaginaCarritoComponent } from './componentes/pagina-carrito/pagina-carrito.component';
import { LoginRegistroComponent } from './componentes/login-registro/login-registro.component';
const routes: Routes = [
  {path: 'tienda', pathMatch:'full', redirectTo:'tienda/categoria/todos'},
  {path: 'tienda/categoria', pathMatch:'full', redirectTo:'tienda/categoria/todos/1'},
  {path: 'tienda/categoria/:categoria', pathMatch:'full', redirectTo:'tienda/categoria/todos/1'},
  {path: 'tienda/categoria/:categoria/:pag', component: PaginaTiendaComponent},
  {path: 'tienda/mostrar-articulo/:id', component: MostrarArticuloComponent},
  {path: 'carrito', component: PaginaCarritoComponent},
  {path: 'login-registro', component: LoginRegistroComponent}
  //{path: 'perfil', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
