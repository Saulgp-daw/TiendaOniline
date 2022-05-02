import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Articulo } from '../model/articulo';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: Array<Articulo> = [];
  cantidadTotal: number = 0;

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  
  constructor() { }


  getProducts(): any{
    return this.productList.asObservable();
  }

  setProduct(articulo: any): void{
    this.cartItemList.push(...articulo);
    this.productList.next(articulo);
  }

  addToCart(articulo: any, usuario: string = "invitado"): void{
    if(this.buscarArticulo(articulo.id)){
      console.log("Encontrado");
      this.productList.next(this.cartItemList);
      
    }else{
      articulo['cantidad'] = 1;
      articulo['precioCantidad'] = (articulo['cantidad'] * articulo.precio).toFixed(2);
      this.cartItemList.push(articulo);
      this.productList.next(this.cartItemList);
    }
    //console.log(this.cartItemList);
    localStorage.setItem(usuario, JSON.stringify(this.cartItemList));
  }

  removeCartItem(articulo: any): void{
    this.cartItemList.map( (a: any, index: number) => {
      if(a.id == articulo.id){
        this.cartItemList.splice(index, 1);
      }
    });
  }

  removeAllCart(): void{
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }



  cargarCarrito(usuario: string = "invitado"){
    if(localStorage.getItem(usuario)){
      this.cartItemList = JSON.parse(localStorage.getItem(usuario)!);
      this.productList.next(this.cartItemList);
      //console.log(this.carrito);
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
    this.cartItemList.map( (articuloEnCarrito: any) => {
      if(articuloEnCarrito.id == id){
        articuloEnCarrito.cantidad += 1;
        articuloEnCarrito.precioCantidad = (articuloEnCarrito.cantidad * articuloEnCarrito.precio).toFixed(2);
        encontrado = true;
      }
    });
    return encontrado;
  }
}
