import { Component, OnInit } from '@angular/core';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Articulo } from 'src/app/model/articulo';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-listar-articulos',
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css']
})
export class ListarArticulosComponent implements OnInit {
  public articulos: any;
  private categoria: any;
  private pagina: any;
  /**
   * 
   * @param crudArticuloService 
   * @param ruta 
   * @param router 
   * 
   * Haciendo uso del módulo de angular 'Router' y 'NavigationEnd' podemos cargar los articulos cuando nos encontramos en nuestra url /tienda/categorias
   * puesto que si solo hacemos uso del onInit los datos se cargarían solo la primera vez que entramos y lo que nos interesa es hacer otra request a nuestra api
   * metemos en el constructor una condición de si el evento es una instancia de fin de navegación haremos otra llamada a la api
   */
  constructor(private crudArticuloService: CrudArticulosService, private ruta: ActivatedRoute, private router: Router, private carritoService: CarritoService) {
    this.router.events.subscribe((event: Event | any) => {
      if (event instanceof NavigationEnd) {
        this.cargarArticulos();
      }
    });
  }

  ngOnInit(): void {
  }


  /**
   * Esta función hará uso del módulo ActivatedRoute de angular para recoger los parametros categoria y número de página
   * se lo enviarémos a nuestro servicio crud y guardaremos la respuesta en un array que tendremos de articulos
   */
  cargarArticulos(): void {
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    this.pagina = this.ruta.snapshot.paramMap.get('pag');
    this.crudArticuloService.ObtenerArticulosCategoria(this.categoria, this.pagina).subscribe(respuesta => {
      this.articulos = respuesta;
    });
  }

  /**
   * llamaremos al servicio carrito y agregaremos el artículo que recibimos como parámetro al carrito
   * activaremos la animación de notificación
   * @param articulo 
   */
  agregarAlCarrito(articulo: Articulo = null!): void {
    this.carritoService.agregarACarrito(articulo);
    this.mostrarNotificacion();
  }

  /**
   * Recogemos del DOM el id 'notificacionAgregado', le damos el nombre de nuestra clase 'mostrar' y después de unos milisegundos se la volvemos a quitar
   * el css se encargará de renderizar la animación
   */
  mostrarNotificacion() {
    var notificacion = document.getElementById('notificacionAgregado')!;
    notificacion.className = 'mostrar';
    setTimeout(() => {
      notificacion.className = '';
    }, 2000);
  }
}
