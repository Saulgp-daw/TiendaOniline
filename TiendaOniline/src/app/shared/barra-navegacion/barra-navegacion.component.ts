import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {
  public totalArticulos: number = 0;
  public nombreUsuario: any = "invitado";
  public categorias: any;
  constructor(private servicioCarrito: CarritoService, private ruta: ActivatedRoute, private router: Router, private crudArticuloService: CrudArticulosService) { 
    this.router.events.subscribe((event: Event | any) => {
      if (event instanceof NavigationEnd) {
        this.cargarSesion();
      }
    });
  }

  ngOnInit(): void {
    this.servicioCarrito.devolverProductos().subscribe( (respuesta: any) => {
      this.totalArticulos = respuesta.length;
    });
    this.cargarSesion();
    this.cargarCategorias();
  }

  cargarCategorias(){
    this.crudArticuloService.ObtenerCategorias().subscribe( respuesta => {
      this.categorias = respuesta;
    });
  }

  cargarSesion():void{
    this.servicioCarrito.devolverUsuario().subscribe( (respuesta: any) => {
      if(respuesta == "invitado"){
        this.nombreUsuario = respuesta;
      }else{
        this.nombreUsuario = respuesta.email;
      }
    });
    this.servicioCarrito.cargarCarrito();
  }

  finalizarSesion():void{
    this.servicioCarrito.limpiarSesion();
    this.servicioCarrito.cargarCarrito();
    
  }
}
