import { Injectable } from '@angular/core';
import { Articulo } from '../model/articulo';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: Array<Articulo> = [];
  cantidadTotal: number = 0;

  public cartItemList 
  
  constructor() { }

  cargarCarrito(usuario: string = "invitado"){
    if(localStorage.getItem(usuario)){
      this.carrito = JSON.parse(localStorage.getItem(usuario)!);
      console.log(this.carrito);
    };
  }

  agregarACarrito(articulo: Articulo, usuario: string = "invitado"): void{
      console.log(articulo);
      if(this.buscarArticulo(articulo.id)){
        console.log("Encontrado");
        
      }else{
        articulo['cantidad'] = 1;
        articulo['precioCantidad'] = articulo['cantidad'] * articulo.precio;
        this.carrito.push(articulo);
      }

    localStorage.setItem(usuario, JSON.stringify(this.carrito));
  }

  buscarArticulo(id: number): Boolean{
    var encontrado = false;
    this.carrito.map( (articuloEnCarrito: any) => {
      if(articuloEnCarrito.id == id){
        articuloEnCarrito.cantidad += 1;
        articuloEnCarrito.precioCantidad = articuloEnCarrito.cantidad * articuloEnCarrito.precio;
        encontrado = true;
      }
    });
    return encontrado;
  }

  devolverTodosArticulos(): Array<Articulo>{
    return this.carrito;
  }

  devolverCantidadArticulos(): any{
    return this.carrito;
  }

  


}
