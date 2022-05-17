import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../model/usuario';
import { Articulo } from '../model/articulo';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
/**
 * Aquí es donde hacemos las peticiones a nuestra api localizada en la carpeta proyecto, hacemos uso de los módulos de angular para conectarnos
 * y devolver la respuesta
 */
export class CrudArticulosService {
  API = environment.local; //api de php en crudo que devuelve un json
  constructor(private clienteHttp:HttpClient) { }

  ObtenerArticulosCategoria(categoria:string = "todos", pagina:number=1, tamPag:number=10): Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/articuloController.php?listar&pag="+pagina+"&tamPag="+tamPag+"&categoria="+categoria);
  }

  ObtenerCategorias(): Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/articuloController.php?nombres_categorias");
  }

  ObtenerDestacados(): Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/articuloController.php?random=3");
  }

  ObtenerArticulo(id: any): Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/articuloController.php?id="+id);
  }

  ObtenerCantidadPaginas(categoria: string):Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/articuloController.php?categorias="+categoria);
  }
  
  actualizarArticulo(articulo: Articulo): Observable<any>{
    return this.clienteHttp.get(this.API+"Controlador/articuloController.php?id="+articulo.id+"&cantidad="+articulo['cantidad']);
  }

  agregarUsuario(datosUsuario: Usuario):Observable<any>{
    return this.clienteHttp.post(this.API+"Controlador/usuarioController.php?registro", datosUsuario);
  }

  borrarUsuario(datosUsuario: Usuario):Observable<any>{
    return this.clienteHttp.post(this.API+"Controlador/usuarioController.php?borrar", datosUsuario);
  }

  comprobarLogin(datosUsuario: Usuario): Observable<any>{
    return this.clienteHttp.post(this.API+"Controlador/usuarioController.php?login", datosUsuario);
  }

  actualizarUsuario(datosUsuario: Usuario):Observable<any>{
    return this.clienteHttp.post(this.API+"Controlador/usuarioController.php?actualizar", datosUsuario);
  }

  



}
