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
        // Show loading indicator
        //console.log('Route change detected');
        this.cargarArticulos();
      }
    });
  }

  ngOnInit(): void {
  }



  cargarArticulos(): void {
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    this.pagina = this.ruta.snapshot.paramMap.get('pag');
    //console.log(this.categoria);
    //console.log(this.pagina);
    this.crudArticuloService.ObtenerArticulosCategoria(this.categoria, this.pagina).subscribe(respuesta => {
      //console.log(respuesta);
      this.articulos = respuesta;
    });
  }

  agregarAlCarrito(articulo: Articulo = null!):void{
    this.carritoService.agregarACarrito(articulo);
  }

  cambiarClase(){
    var notificacion = document.getElementById("notificacionAgregado")!;
    notificacion.className = 'aa';
    notificacion.className = 'mostrar';
    setTimeout(() => {
      notificacion.className = '';
    }, 2000);
  }

  agregarNotificacion(): void{
    $("#notificacion").remove();
    var div = document.createElement('div');
    $(div).attr('id', 'notificacion');
    $('body').append(div);
    var node = document.querySelector('#notificacion')!;
    node.innerHTML = "(1) producto añadido";
    var newNode = node.cloneNode(true);
    node.parentNode!.replaceChild(newNode, node);
    $('#notificacion').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });
  }

}
