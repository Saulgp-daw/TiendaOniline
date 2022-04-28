import { Component, OnInit } from '@angular/core';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-listar-articulos',
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css']
})
export class ListarArticulosComponent implements OnInit {
  public Articulos:any;
  private categoria: any;
  private pagina: any;
  public cantidadPaginas!: any[]; 

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
  constructor(private crudArticuloService: CrudArticulosService, private ruta: ActivatedRoute, private router: Router) { 
    this.router.events.subscribe((event: Event | any) => {
      if (event instanceof NavigationEnd) {
        // Show loading indicator
        //console.log('Route change detected');
        this.cargarArticulos();
        this.cantidadDePaginas();
    }
    })
  }

  ngOnInit(): void {
    this.cargarArticulos();
    this.cantidadDePaginas();
  }

  cantidadDePaginas(articulosPorPagina: number = 10):void{
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    if(this.categoria == "todos"){
      this.categoria = "";
    }
    this.crudArticuloService.ObtenerCantidadPaginas(this.categoria).subscribe( respuesta => {
      console.log(respuesta);
      var cantidadArticulos = parseInt(respuesta.cantidad);
      console.log(Math.ceil(cantidadArticulos/articulosPorPagina));
      this.cantidadPaginas = new Array(Math.ceil(cantidadArticulos/articulosPorPagina));
    });
  }

  cargarArticulos():void{
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    this.pagina = this.ruta.snapshot.paramMap.get('pag');
    //console.log(this.categoria);
    //console.log(this.pagina);
    this.crudArticuloService.ObtenerArticulosCategoria(this.categoria, this.pagina).subscribe(respuesta => {
      //console.log(respuesta);
      this.Articulos = respuesta;
    });
  }

}
