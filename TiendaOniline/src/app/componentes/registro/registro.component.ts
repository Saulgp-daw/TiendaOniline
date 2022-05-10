import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formularioDeRegistro: FormGroup;

  public resultadoRegistro: any;
  public resultadoLogin: any;

  constructor(public formulario: FormBuilder, private crudArticuloService: CrudArticulosService, private router: Router) { 
    this.formularioDeRegistro = this.formulario.group({
      email:[''],
      contrasenha:[''],
      nombre:[''],
      apellidos:[''],
      direccion:[''],
      codigo_postal:[''],
      telefono_fijo:[''],
      pais:[''],
    });
  }

  ngOnInit(): void {
  }

  /**
   * la variable nuevo registro se ejecutará una vez el usuario envíe sus datos a nuestra base de datos, dependiendo de la respuesta
   * se le mostrará un mensaje con el resultado
   */
  async nuevoRegistro(): Promise<void>{
    //this.resultadoRegistro = await this.crudArticuloService.agregarUsuario(this.formularioDeRegistro.value).toPromise(); deprecated
    this.resultadoRegistro = await lastValueFrom(this.crudArticuloService.agregarUsuario(this.formularioDeRegistro.value));

    switch(this.resultadoRegistro.resultado){
      case("exito"):
          alert("Usuario Registrado con éxito");
          this.router.navigate(["login"]);
          break;
      case("campos_vacios"):
          alert("Uno o más campos están vacíos");
          break;
      case("usuario_existente"):
          alert("Este usuario ya está registrado, inténtelo de nuevo");
          break;
      case("num_argumentos"):
          alert("El número de argumentos pasados es menor de lo posible");
          break;
      }
  }
}
