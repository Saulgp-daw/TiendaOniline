import { Component, OnInit } from '@angular/core';
import { Articulo } from './model/articulo';
//import { plainToClass } from \"class-transformer\";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    var obj: Articulo = JSON.parse("{\"id\":\"2\",\"descripcion\":\"Pack de media docena\",\"nombre\":\"Huevos\",\"precio\":\"2.40\",\"imagen\":\"https:\/\/i.imgur.com\/ty8OyAG.png\",\"categoria\":\"Alimentos\",\"estado\":\"Disponible\",\"stock\":\"40\"}");
    console.log(obj);
  }
  title = 'TiendaOniline';


}
