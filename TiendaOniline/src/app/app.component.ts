import { Component, OnInit } from '@angular/core';
import { CarritoService } from './servicios/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    this.carritoService
  }

  constructor(private carritoService: CarritoService) {
  }
  title = 'TiendaOniline';
}
