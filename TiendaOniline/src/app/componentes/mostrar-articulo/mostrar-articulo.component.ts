import { Component, OnInit } from '@angular/core';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-articulo',
  templateUrl: './mostrar-articulo.component.html',
  styleUrls: ['./mostrar-articulo.component.css']
})
export class MostrarArticuloComponent implements OnInit {
  private id: any;
  public Articulo: any;
  Categorias: any;
  
  constructor(private crudArticuloService: CrudArticulosService, private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.ruta.snapshot.paramMap.get('id');
    //console.log(this.id);
    this.crudArticuloService.ObtenerArticulo(this.id).subscribe(respuesta => {
      //console.log(respuesta);
      this.Articulo = respuesta;
    });

    this.crudArticuloService.ObtenerCategorias().subscribe( respuesta => {
      //console.log(respuesta);
      this.Categorias = respuesta;
    });
  }

}
