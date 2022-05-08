import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
/**
 * importamos formgroup y formbuilder para recoger los valores de los inputs
 * lastvalue from es una promesa que recogerá de la api el último los valores que nos devuelva
 */

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
/**
 * en el contructor ponemos el nombre de los campos que vayamos a recibir
 */
export class LoginRegistroComponent implements OnInit {
  formularioDeRegistro: FormGroup;
  public resultadoRegistro: any;

  constructor(public formulario: FormBuilder, private crudArticuloService: CrudArticulosService) { 
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
    console.log("Prueba");
    console.log(this.formularioDeRegistro.value);
    //this.resultadoRegistro = await this.crudArticuloService.agregarUsuario(this.formularioDeRegistro.value).toPromise(); deprecated
    this.resultadoRegistro = await lastValueFrom(this.crudArticuloService.agregarUsuario(this.formularioDeRegistro.value));
    console.log(this.resultadoRegistro);

    switch(this.resultadoRegistro.resultado){
      case("exito"):
          alert("Usuario Registrado con éxito");
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
