import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {
  public totalArticulos: number = 0;
  constructor(private servicioCarrito: CarritoService) { }

  ngOnInit(): void {
    this.servicioCarrito.devolverProductos().subscribe( (respuesta: any) => {
      this.totalArticulos = respuesta.length;
    })
    
  }

}
