import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Articulo } from '../model/articulo';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  cantidadTotal: number = 0;

  public carrito: any = [];
  public listaProductos = new BehaviorSubject<any>([]);
  
  constructor() { }


  getProducts(): any{
    return this.listaProductos.asObservable();
  }

  setProduct(articulo: any): void{
    this.carrito.push(...articulo);
    this.listaProductos.next(articulo);
  }

  addToCart(articulo: any, usuario: string = "invitado"): void{
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
    localStorage.setItem(usuario, JSON.stringify(this.carrito));
  }

  removeCartItem(articulo: any): void{
    this.carrito.map( (articuloCarrito: any, index: number) => {
      if(articuloCarrito.id == articulo.id){
        this.carrito.splice(index, 1);
      }
    });
  }

  removeAllCart(): void{
    this.carrito = [];
    this.listaProductos.next(this.carrito);
  }

  cargarCarrito(usuario: string = "invitado"){
    if(localStorage.getItem(usuario)){
      this.carrito = JSON.parse(localStorage.getItem(usuario)!);
      this.listaProductos.next(this.carrito);
      //console.log(this.carrito);
    };
  }

  buscarArticulo(id: number): Boolean{
    var encontrado = false;
    this.carrito.map( (articuloEnCarrito: any) => {
      if(articuloEnCarrito.id == id){
        articuloEnCarrito.cantidad += 1;
        articuloEnCarrito.precioCantidad = (articuloEnCarrito.cantidad * articuloEnCarrito.precio).toFixed(2);
        encontrado = true;
      }
    });
    return encontrado;
  }
}
