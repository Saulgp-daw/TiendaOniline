import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../model/usuario';
import { Articulo } from '../model/articulo';


@Injectable({
  providedIn: 'root'
})
/**
 * Aquí es donde hacemos las peticiones a nuestra api localizada en la carpeta proyecto, hacemos uso de los módulos de angular para conectarnos
 * y devolver la respuesta
 */
export class CrudArticulosService {
  API: string="http://localhost/PHP/DWES/Proyecto/"; //api de php en crudo que devuelve un json
  constructor(private clienteHttp:HttpClient) { }

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

  agregarUsuario(datosUsuario: Usuario):Observable<any>{
    return this.clienteHttp.post(this.API+"Controlador/registro.php", datosUsuario);
  }

  comprobarLogin(datosUsuario: Usuario): Observable<any>{
    return this.clienteHttp.post(this.API+"Controlador/login.php", datosUsuario);
  }

  actualizarArticulo(articulo: Articulo): Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/actualizarArticulo.php?id="+articulo.id+"&cantidad="+articulo['cantidad']);
  }

  actualizarUsuario(datosUsuario: Usuario):Observable<any>{
    return this.clienteHttp.post(this.API+"Controlador/actualizarUsuario.php?actualizar", datosUsuario);
  }

  



}
