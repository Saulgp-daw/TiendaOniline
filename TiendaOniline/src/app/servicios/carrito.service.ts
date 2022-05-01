import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService implements OnInit{
  articulosCarrito: any = [];
  cantidadTotal: number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log("Prueba");
  }
}
