import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Articulo } from '../model/articulo';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public carrito: any = [];
  public listaProductos = new BehaviorSubject<any>([]);
  public usuario: any = "invitado";
  public usuarioBehaviour = new BehaviorSubject<any>("invitado");
  
  constructor() { }

  /**
   * 
   * @param usuario Recibimos un usuario y haciendo uso de BehaviorSubject guardaremos el usuario en el localstorage
   */
  setUsuario(usuario: any){
    this.usuario = usuario;
    this.usuarioBehaviour.next(this.usuario);
    this.guardarUsuario();
  }

  /**
   * Devolvemos el usuario conectado actualmetne
   */
  devolverUsuario(): any{
    if(localStorage.getItem("usuarioConectado")){
      this.usuario = JSON.parse(localStorage.getItem("usuarioConectado")!);
      this.usuarioBehaviour.next(this.usuario);
    }
    return this.usuarioBehaviour.asObservable();
  }

  /**
   * guardamos el suuario en localstorage
   */
  guardarUsuario(): void{
    localStorage.setItem("usuarioConectado", JSON.stringify(this.usuario));
  }

  /**
   * eliminamos al usuario del localstorage y lo volvemos a inicializar a invitado
   */
  limpiarSesion():void{
    localStorage.removeItem("usuarioConectado");
    this.usuario = "invitado";
    this.usuarioBehaviour.next(this.usuario);
  }


  /**
   * 
   * @returns la lista de productos del carrito como observable
   */
  devolverProductos(): any{
    return this.listaProductos.asObservable();
  }

  setProduct(articulo: any): void{
    this.carrito.push(...articulo);
    this.listaProductos.next(articulo);
  }

  /**
   * primero buscamos si existe dicho producto en el carrito, si existe actualizamos el carrito y la lista de productos
   * si no existe creamos atributos fuera de clase que solo usaremos en el carrito y lo metemos en el array
   * @param articulo 
   */
  agregarACarrito(articulo: any): void{
    if(this.buscarArticulo(articulo.id)){
      this.listaProductos.next(this.carrito); 
    }else{
      articulo['cantidad'] = 1;
      articulo['precioCantidad'] = (articulo['cantidad'] * articulo.precio).toFixed(2);
      this.carrito.push(articulo);
      this.listaProductos.next(this.carrito);
    }
    this.guardarCarrito();
  }

  /**
   * 
   * @param articulo buscamos si el id del articulo que nos envían coincide con alguno de los del carrito, si ese es el caso lo eliminamos y guardamos el carrito
   */
  borrarArticulo(articulo: any): void{
    this.carrito.map( (articuloCarrito: any, index: number) => {
      if(articuloCarrito.id == articulo.id){
        this.carrito.splice(index, 1);
        this.listaProductos.next(this.carrito);
        this.guardarCarrito();
      }
    });
  }

  /**
   * Ponemos el array a vacío y guardamos el carrito
   */
  borrarTodo(): void{
    this.carrito = [];
    this.listaProductos.next(this.carrito);
    this.guardarCarrito();
  }

  /**
   * dependiendo de si el atributo es invitado o no cargaremos dependiendo del usuario su carrito guardado en el localstorage
   */
  cargarCarrito(){
    if(this.usuario == "invitado"){
      if(localStorage.getItem(this.usuario)){
        this.carrito = JSON.parse(localStorage.getItem(this.usuario)!);
        this.listaProductos.next(this.carrito);
      }else{
        this.borrarTodo();
      }
    }else{
      if(localStorage.getItem(this.usuario.email)){
        this.carrito = JSON.parse(localStorage.getItem(this.usuario.email)!);
        this.listaProductos.next(this.carrito);
      }
    }
     
  }

  /**
   * mismo caso que con cargar, guardaremos el carrito ligado al usuario en el localstorage
   */
  guardarCarrito(): void{
    if(this.usuario == "invitado"){
      localStorage.setItem(this.usuario, JSON.stringify(this.carrito));
    }else{
      localStorage.setItem(this.usuario.email, JSON.stringify(this.carrito));
    }
    
  }

  /**
   * buscamos un artículo dependiendo de su id y mandaremos true si existe dicho artículo, modificando su cantidad
   * @param id 
   * @param cantidad 
   * @returns bool
   */
  buscarArticulo(id: number, cantidad: number = 1): Boolean{
    var encontrado = false;
    this.carrito.map( (articuloEnCarrito: any) => {
      if(articuloEnCarrito.id == id){
        articuloEnCarrito.cantidad += cantidad;
        articuloEnCarrito.precioCantidad = (articuloEnCarrito.cantidad * articuloEnCarrito.precio).toFixed(2);
        encontrado = true;
      }
    });
    return encontrado;
  }

  /**
   * 
   * @returns simple función para enviar unos calculos
   */
  calcularTotal(): number{
    let granTotal = 0;
    this.carrito.map( (articuloEnCarrito: any) => {
      granTotal += parseFloat(articuloEnCarrito.precioCantidad);
    });
    return parseFloat(granTotal.toFixed(2));
  }

  /**
   * 
   * @param articulo recibimos un articulo y lo añadimos al carrito (de forma negativa que acabaría restándose)
   */
  restarUnidades(articulo: Articulo): void{
    if(this.buscarArticulo(articulo.id, -1)){
      this.listaProductos.next(this.carrito);
      this.guardarCarrito();
    }
  }

  /**
   * 
   * @param articulo  recibimos un articulo y lo añadimos al carrito
   */
  aumentarUnidades(articulo: Articulo): void{
    if(this.buscarArticulo(articulo.id)){
      this.listaProductos.next(this.carrito);
      this.guardarCarrito();
    }
  }

  
}
