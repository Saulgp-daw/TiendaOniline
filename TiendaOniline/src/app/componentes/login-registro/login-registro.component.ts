import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent implements OnInit {
  formularioDeRegistro: FormGroup;

  constructor(public formulario: FormBuilder) { 
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
  }

}
