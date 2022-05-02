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
    localStorage.setItem(this.usuario, JSON.stringify(this.carrito));
  }

  borrarArticulo(articulo: any): void{
    this.carrito.map( (articuloCarrito: any, index: number) => {
      if(articuloCarrito.id == articulo.id){
        this.carrito.splice(index, 1);
        this.listaProductos.next(this.carrito);
        localStorage.setItem(this.usuario, JSON.stringify(this.carrito));
      }
    });
  }

  borrarTodo(): void{
    this.carrito = [];
    this.listaProductos.next(this.carrito);
    localStorage.setItem(this.usuario, JSON.stringify(this.carrito));
  }

  cargarCarrito(){
    if(localStorage.getItem(this.usuario)){
      this.carrito = JSON.parse(localStorage.getItem(this.usuario)!);
      this.listaProductos.next(this.carrito);
      //console.log(this.carrito);
    }
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

  calcularTotal(): number{
    let granTotal = 0;
    this.carrito.map( (articuloEnCarrito: any) => {
      granTotal += parseFloat(articuloEnCarrito.precioCantidad);
    });
    return granTotal;
  }
}
