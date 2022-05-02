import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/model/articulo';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-pagina-carrito',
  templateUrl: './pagina-carrito.component.html',
  styleUrls: ['./pagina-carrito.component.css']
})
export class PaginaCarritoComponent implements OnInit {
  carrito: Array<Articulo> = [];


  constructor(private servicioCarrito: CarritoService) { }

  ngOnInit(): void {
    this.servicioCarrito.getProducts().subscribe( (respuesta: any) => {
      this.carrito = respuesta;
    });
  }

}
