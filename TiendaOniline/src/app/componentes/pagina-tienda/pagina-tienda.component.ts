import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';

@Component({
  selector: 'app-pagina-tienda',
  templateUrl: './pagina-tienda.component.html',
  styleUrls: ['./pagina-tienda.component.css']
})
export class PaginaTiendaComponent implements OnInit {

  Categorias: any;
  private categoria: any;
  private pagina: any;
  Articulos:any;

  constructor(private crudArticuloService: CrudArticulosService, private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(){
    this.crudArticuloService.ObtenerCategorias().subscribe( respuesta => {
      this.Categorias = respuesta;
    });
    
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    this.pagina = this.ruta.snapshot.paramMap.get('pag');
    //console.log(this.categoria);
    //console.log(this.pagina);
    
  }

}
