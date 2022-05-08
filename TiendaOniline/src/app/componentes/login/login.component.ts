import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  public resultadoLogin: any;

  constructor(public formulario: FormBuilder, private crudArticuloService: CrudArticulosService) { 
    this.formularioLogin = this.formulario.group({
      email:[''],
      contrasenha:['']
    });
  }

  ngOnInit(): void {
  }

  async nuevoLogin(): Promise<void>{
    console.log("Prueba");
    console.log(this.formularioLogin.value);
    this.resultadoLogin = await lastValueFrom(this.crudArticuloService.comprobarLogin(this.formularioLogin.value));
    console.log(this.resultadoLogin);
  }
}
