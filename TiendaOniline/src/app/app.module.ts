import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListarArticulosComponent } from './componentes/listar-articulos/listar-articulos.component';
import { MostrarArticuloComponent } from './componentes/mostrar-articulo/mostrar-articulo.component';
import { ListarCategoriasComponent } from './componentes/listar-categorias/listar-categorias.component';
import { PaginaTiendaComponent } from './componentes/pagina-tienda/pagina-tienda.component';
import { PaginadoComponent } from './componentes/paginado/paginado.component';
import { BarraNavegacionComponent } from './shared/barra-navegacion/barra-navegacion.component';
import { PaginaCarritoComponent } from './componentes/pagina-carrito/pagina-carrito.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { ProductoNotificacionDirective } from './shared/producto-notificacion.directive';
import { HomeComponent } from './componentes/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ListarArticulosComponent,
    MostrarArticuloComponent,
    ListarCategoriasComponent,
    PaginaTiendaComponent,
    PaginadoComponent,
    BarraNavegacionComponent,
    PaginaCarritoComponent,
    LoginComponent,
    RegistroComponent,
    PerfilUsuarioComponent,
    ProductoNotificacionDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
