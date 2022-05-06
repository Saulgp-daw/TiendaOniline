import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';


@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent implements OnInit {
  formularioDeRegistro: FormGroup;

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

  nuevoRegistro(): any{
    console.log("Prueba");
    console.log(this.formularioDeRegistro.value);
    var resultado = this.crudArticuloService.agregarUsuario(this.formularioDeRegistro.value).subscribe( respuesta => {
      console.log(respuesta);
    });
    
  }

}
