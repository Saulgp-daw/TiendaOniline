import { Injectable } from '@angular/core';
import { Articulo } from '../model/articulo';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: Array<Articulo> = [];
  cantidadTotal: number = 0;
  
  constructor() { }

  cargarCarrito(usuario: string = "invitado"){
    if(this.carrito.length > 0)
      localStorage.setItem(usuario, JSON.stringify(this.carrito));
  }

  agregarACarrito(articulo: Articulo): void{
      console.log(articulo);
      if(this.carrito.length > 0){
        this.carrito.map( (articuloEnCarrito: any) => {
          if(articuloEnCarrito.id == articulo.id){
            articuloEnCarrito.cantidad += 1;
          }else{
            articulo['cantidad'] = 1;
            this.carrito.push(articulo);
          }
        });
      }else{
        articulo['cantidad'] = 1;
        this.carrito.push(articulo);
      }


    this.devolverTodosArticulos();
  }
  

  devolverTodosArticulos(){
    console.log(this.carrito);
  }


}
