import { Component, OnInit } from '@angular/core';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {
  Categorias: any; //nuestra variable que recorreremos con un ngFor que tendrá todas los nombres de las categorías
  private categoria: any;
  private pagina: any;
  Articulos:any;

  constructor(private crudArticuloService: CrudArticulosService, private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  /**
   * llamaremos a nuestro servicio 'crudArticuloService' y guardaremos en nuestra variable 'Categorias' la respuesta
   */
  cargarCategorias(){
    this.crudArticuloService.ObtenerCategorias().subscribe( respuesta => {
      this.Categorias = respuesta;
    });
    
    this.categoria = this.ruta.snapshot.paramMap.get('categoria');
    this.pagina = this.ruta.snapshot.paramMap.get('pag');
  }

}
