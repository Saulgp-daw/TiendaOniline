import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/model/articulo';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-pagina-carrito',
  templateUrl: './pagina-carrito.component.html',
  styleUrls: ['./pagina-carrito.component.css']
})
export class PaginaCarritoComponent implements OnInit {
  public carrito: Array<Articulo> = [];
  public granTotal: number = 0;


  constructor(private servicioCarrito: CarritoService) { }

  ngOnInit(): void {
    this.servicioCarrito.devolverProductos().subscribe( (respuesta: any) => {
      this.carrito = respuesta;
      this.granTotal = this.servicioCarrito.calcularTotal();
    });
  }

  borrarArticulo(articulo: Articulo): void{
    this.servicioCarrito.borrarArticulo(articulo);
  }

  borrarTodos(): void{
    this.servicioCarrito.borrarTodo();
  }

}
