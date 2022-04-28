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
  
  constructor(private crudArticuloService: CrudArticulosService, private ruta: ActivatedRoute, private router: Router) { 
    this.router.events.subscribe((event: Event | any) => {
      if (event instanceof NavigationEnd) {
        // Show loading indicator
        //console.log('Route change detected');
        this.cargarPaginado();
      }
    });

  }

  ngOnInit(): void {
  }

  cargarPaginado(articulosPorPagina: number = 10):void{
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    if(this.categoria == "todos"){
      this.categoria = "";
    }
    this.crudArticuloService.ObtenerCantidadPaginas(this.categoria).subscribe( respuesta => {
      //console.log(respuesta);
      var cantidadArticulos = parseInt(respuesta.cantidad);
      //console.log(Math.ceil(cantidadArticulos/articulosPorPagina));
      var numPaginas = Math.ceil(cantidadArticulos/articulosPorPagina);
      this.cantidadPaginas = new Array<number>();
      for(let i = 1; i <= numPaginas; i++){
        this.cantidadPaginas.push(i);
      }
    });

    var selectPaginado = document.getElementById("selectPaginado");
    console.log(document.location.href);
    if(selectPaginado != null){
      selectPaginado.addEventListener("change", function() {
        console.log("cambio de pagina")
    });
    }
   

  }

}