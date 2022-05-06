import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
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

  async nuevoRegistro(): Promise<void>{
    console.log("Prueba");
    console.log(this.formularioDeRegistro.value);
    //this.resultadoRegistro = await this.crudArticuloService.agregarUsuario(this.formularioDeRegistro.value).toPromise(); deprecated
    this.resultadoRegistro = await lastValueFrom(this.crudArticuloService.agregarUsuario(this.formularioDeRegistro.value));
    console.log(this.resultadoRegistro);

    /*switch(this.resultadoRegistro.resultado){
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
      
      }*/
    
  }

}
