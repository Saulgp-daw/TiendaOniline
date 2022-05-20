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

  /**
   * Con Router podemos cargar el paginado por cada cambio de secciones de nuestro dominio
   * @param servicioCarrito 
   * @param ruta 
   * @param router 
   * @param crudArticuloService 
   */
  constructor(private servicioCarrito: CarritoService, private ruta: ActivatedRoute, private router: Router, private crudArticuloService: CrudArticulosService) { 
    this.router.events.subscribe((event: Event | any) => {
      if (event instanceof NavigationEnd) {
        this.cargarSesion();
      }
    });
  }

  /**
   * llamamos a nuestro servicio carrito y de la respuesta cogemos el length y lo guardamos en el atributo totalArticulos
   */
  ngOnInit(): void {
    this.servicioCarrito.devolverProductos().subscribe( (respuesta: any) => {
      this.totalArticulos = respuesta.length;
    });
    this.cargarSesion();
    this.cargarCategorias();
  }

  /**
   * llamamos a nuestro servicio para obtener las categorias
   */
  cargarCategorias(){
    this.crudArticuloService.ObtenerCategorias().subscribe( respuesta => {
      this.categorias = respuesta;
    });
  }

  /**
   * recogeremos la respuesta del servicio carrito y la guardamos en la variable nombre de usuario
   */
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

  /**
   * fializamos la sesión llamando al servicio carrito
   */
  finalizarSesion():void{
    this.servicioCarrito.limpiarSesion();
    this.servicioCarrito.cargarCarrito();
    
  }
}
