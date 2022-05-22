import { Component, OnInit } from '@angular/core';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/model/articulo';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-mostrar-articulo',
  templateUrl: './mostrar-articulo.component.html',
  styleUrls: ['./mostrar-articulo.component.css']
})
export class MostrarArticuloComponent implements OnInit {
  private id: any;
  public Articulo: any;
  Categorias: any;
  
  constructor(private crudArticuloService: CrudArticulosService, private ruta: ActivatedRoute, private carritoService: CarritoService) { }

  /**
   * Esta función mostrará un único artículo, recogemos el parámetro id de la url y se la enviaremos al servicio
   * la respuesta que nos devuelva será un objeto Artículo
   */
  ngOnInit(): void {
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.crudArticuloService.ObtenerArticulo(this.id).subscribe(respuesta => {
      this.Articulo = respuesta;
    });
  }

  /**
   * Similar a lo que hacemos en el componente listarArticulos, agregaremos al carrito el articulo seleccionado después de hacer click
   * @param articulo 
   */
  agregarAlCarrito(articulo: Articulo = null!):void{
    this.carritoService.agregarACarrito(articulo);
    this.mostrarNotificacion();
  }

  /**
   * Similar al login, cogeremos del DOM el id 'notificacionAgregado', le añadiremos su nombre de clase a mostrar y después de un tiempo
   * se lo quitamos
   */
  mostrarNotificacion() {
    var notificacion = document.getElementById('notificacionAgregado')!;
    notificacion.className = 'mostrar';
    setTimeout(() => {
      notificacion.className = '';
    }, 2000);
  }

  volverPaginaAnterior():void{
    window.history.back();
  }

}
