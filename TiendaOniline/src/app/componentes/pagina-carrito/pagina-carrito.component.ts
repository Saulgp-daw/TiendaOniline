import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/model/articulo';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';

@Component({
  selector: 'app-pagina-carrito',
  templateUrl: './pagina-carrito.component.html',
  styleUrls: ['./pagina-carrito.component.css']
})
export class PaginaCarritoComponent implements OnInit {
  public carrito: Array<Articulo> = [];
  public granTotal: number = 0;
  public usuario: any;


  constructor(private servicioCarrito: CarritoService, private servicioArticulos: CrudArticulosService) { }

  ngOnInit(): void {
    this.servicioCarrito.devolverProductos().subscribe( (respuesta: any) => {
      this.carrito = respuesta;
      this.granTotal = this.servicioCarrito.calcularTotal();
    });
    this.servicioCarrito.devolverUsuario().subscribe( (respuesta: any) => {
      this.usuario = respuesta;
    });
  }

  borrarArticulo(articulo: Articulo): void{
    this.servicioCarrito.borrarArticulo(articulo);
  }

  borrarTodos(): void{
    this.servicioCarrito.borrarTodo();
  }

  restarUnidades(articulo: Articulo): void{
      this.servicioCarrito.restarUnidades(articulo);
      if(articulo['cantidad'] <= 0){
        this.servicioCarrito.borrarArticulo(articulo);
      }
  }

  aumentarUnidades(articulo: Articulo): void{
    if(articulo['cantidad'] < articulo.stock){
      this.servicioCarrito.aumentarUnidades(articulo);
    }else{
      alert("Has superado el límite de stock de este producto!");
    }
  }

  finalizarCompra(): void{
    this.carrito.forEach(articulo => {
      this.servicioArticulos.actualizarArticulo(articulo).subscribe(respuesta => { console.log(respuesta)}); //quitar el console log cuando salga a produccion
    });
    //this.servicioCarrito.borrarTodo();
  }

}
