import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarArticulosComponent } from './componentes/listar-articulos/listar-articulos.component';
import { EditarArticulosComponent } from './componentes/editar-articulos/editar-articulos.component';

import { HttpClientModule } from '@angular/common/http';
import { MostrarArticuloComponent } from './componentes/mostrar-articulo/mostrar-articulo.component';
import { ListarCategoriasComponent } from './componentes/listar-categorias/listar-categorias.component';
import { PaginaTiendaComponent } from './componentes/pagina-tienda/pagina-tienda.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarArticulosComponent,
    EditarArticulosComponent,
    MostrarArticuloComponent,
    ListarCategoriasComponent,
    PaginaTiendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
