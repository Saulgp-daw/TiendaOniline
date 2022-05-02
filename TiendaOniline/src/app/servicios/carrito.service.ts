import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Articulo } from '../model/articulo';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public carrito: any = [];
  public listaProductos = new BehaviorSubject<any>([]);
  private usuario: string = "invitado";
  
  constructor() { }


  devolverProductos(): any{
    return this.listaProductos.asObservable();
  }

  setProduct(articulo: any): void{
    this.carrito.push(...articulo);
    this.listaProductos.next(articulo);
  }

  agregarACarrito(articulo: any): void{
    if(this.buscarArticulo(articulo.id)){
      console.log("Encontrado");
      this.listaProductos.next(this.carrito);
      
    }else{
      articulo['cantidad'] = 1;
      articulo['precioCantidad'] = (articulo['cantidad'] * articulo.precio).toFixed(2);
      this.carrito.push(articulo);
      this.listaProductos.next(this.carrito);
    }
    //console.log(this.carrito);
    this.guardarCarrito();
  }

  borrarArticulo(articulo: any): void{
    this.carrito.map( (articuloCarrito: any, index: number) => {
      if(articuloCarrito.id == articulo.id){
        this.carrito.splice(index, 1);
        this.listaProductos.next(this.carrito);
        this.guardarCarrito();
      }
    });
  }

  borrarTodo(): void{
    this.carrito = [];
    this.listaProductos.next(this.carrito);
    this.guardarCarrito();
  }

  cargarCarrito(){
    if(localStorage.getItem(this.usuario)){
      this.carrito = JSON.parse(localStorage.getItem(this.usuario)!);
      this.listaProductos.next(this.carrito);
      //console.log(this.carrito);
    }
  }

  guardarCarrito(): void{
    localStorage.setItem(this.usuario, JSON.stringify(this.carrito));
  }

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

  calcularTotal(): number{
    let granTotal = 0;
    this.carrito.map( (articuloEnCarrito: any) => {
      granTotal += parseFloat(articuloEnCarrito.precioCantidad);
    });
    return granTotal;
  }

  restarUnidades(articulo: Articulo): void{
    if(this.buscarArticulo(articulo.id, -1)){
      this.listaProductos.next(this.carrito);
      this.guardarCarrito();
    }
  }

  aumentarUnidades(articulo: Articulo): void{
    if(this.buscarArticulo(articulo.id)){
      this.listaProductos.next(this.carrito);
      this.guardarCarrito();
    }
  }
}
