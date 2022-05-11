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
  
  constructor(private crudArticuloService: CrudArticulosService, private ruta: ActivatedRoute, private router: Router, private location: Location) { 
    this.router.events.subscribe((event: Event | any) => {
      if (event instanceof NavigationEnd) {
        // Show loading indicator
        //console.log('Route change detected');
        this.cargarPaginado(this.ARTICULOSPORPAGINA);
      }
    });

  }

  ngOnInit(): void {
  }

  cargarPaginado(ARTICULOSPORPAGINA: number):void{
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    console.log(this.categoria);
    if(this.categoria == "todos"){
      this.categoria = "";
    }
    this.crudArticuloService.ObtenerCantidadPaginas(this.categoria).subscribe( respuesta => {
      console.log(respuesta);
      var cantidadArticulos = parseInt(respuesta.cantidad);
      //console.log(Math.ceil(cantidadArticulos/ARTICULOSPORPAGINA));
      var numPaginas = Math.ceil(cantidadArticulos/ARTICULOSPORPAGINA);
      this.cantidadPaginas = new Array<number>();
      for(let i = 1; i <= numPaginas; i++){
        this.cantidadPaginas.push(i);
      }
    });
  }

  redirigir(event: any){
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    this.pag = event.target.value;
    //console.log(this.pag);
    this.router.navigate(["/tienda/categoria/"+this.categoria+"/"+this.pag]);
    this.paginaActual = this.pag;
  }

}
