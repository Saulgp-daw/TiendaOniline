import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';

@Component({
  selector: 'app-paginado',
  templateUrl: './paginado.component.html',
  styleUrls: ['./paginado.component.css']
})
export class PaginadoComponent implements OnInit {
  private categoria: any;
  public cantidadPaginas = new Array<number>();
  public pag: number = 0;
  public paginaActual !: number;
  private ARTICULOSPORPAGINA: number = 10;
  
  /**
   * Con Router podemos cargar el paginado por cada cambio de secciones de nuestro dominio
   * @param crudArticuloService nuestro servicio
   * @param ruta módulo de angular
   * @param router módulo de angular
   * @param location módulo de angular
   */
  constructor(private crudArticuloService: CrudArticulosService, private ruta: ActivatedRoute, private router: Router, private location: Location) { 
    this.router.events.subscribe((event: Event | any) => {
      if (event instanceof NavigationEnd) {
        this.cargarPaginado(this.ARTICULOSPORPAGINA);
      }
    });

  }

  ngOnInit(): void {
  }

  /**
   * Recibiremos una constante que determinaría el número de artículos por página
   * Recogemos de la url el parámetro categoria gracias al módulo ActivatedRoute y llamaremos a nuestro servicio,
   * dependiendo de la respuesta calculamos el número de páginas haciendo una división
   * @param ARTICULOSPORPAGINA 
   */
  cargarPaginado(ARTICULOSPORPAGINA: number):void{
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    if(this.categoria == "todos"){
      this.categoria = "";
    }
    this.crudArticuloService.ObtenerCantidadPaginas(this.categoria).subscribe( respuesta => {
      var cantidadArticulos = parseInt(respuesta.cantidad);
      var numPaginas = Math.ceil(cantidadArticulos/ARTICULOSPORPAGINA);
      this.cantidadPaginas = new Array<number>();
      for(let i = 1; i <= numPaginas; i++){
        this.cantidadPaginas.push(i);
      }
    });
  }

  /**
   * 
   * @param event Cuando el usuario le de a la página que desean ir haremos uso del módulo Router para redirigirle a esa página
   */
  redirigir(event: any){
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    this.pag = event.target.value;
    this.router.navigate(["/tienda/categoria/"+this.categoria+"/"+this.pag]);
    this.paginaActual = this.pag;
  }

}
