import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudArticulosService {
  API: string="http://localhost/PHP/DWES/Proyecto/"; //api de php en crudo que devuelve un json
  constructor(private clienteHttp:HttpClient) { }

  /*ObtenerArticulos(pagina:number=1, tamPag:number=10){
    return this.clienteHttp.get(this.API+"Controlador/listadoArticulos.php?pag="+pagina+"&tamPag="+tamPag);
  }*/

  ObtenerArticulosCategoria(categoria:string = "todos", pagina:number=1, tamPag:number=10): Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/listadoArticulos.php?pag="+pagina+"&tamPag="+tamPag+"&categoria="+categoria);
  }

  ObtenerCategorias(): Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/listadoCategorias.php");
  }

  ObtenerArticulo(id: any): Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/buscarArticulo.php?id="+id);
  }

  ObtenerCantidadPaginas(categoria: string):Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/devolverCantidadArticulos.php?categoria="+categoria);
  }

  



}
