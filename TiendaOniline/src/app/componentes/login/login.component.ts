import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  public resultadoLogin: any;
  public usuario!: Usuario;

  constructor(public formulario: FormBuilder, private crudArticuloService: CrudArticulosService, private carritoService: CarritoService) { 
    this.formularioLogin = this.formulario.group({
      email:[''],
      contrasenha:['']
    });
  }

  ngOnInit(): void {
  }

  async nuevoLogin(): Promise<void>{
    console.log("Prueba");
    this.resultadoLogin = await lastValueFrom(this.crudArticuloService.comprobarLogin(this.formularioLogin.value));
    this.usuario = this.resultadoLogin;
    if(this.resultadoLogin.resultado){
      alert("Usuario o contraseña incorrectos")
    }else{
      this.carritoService.setUsuario(this.usuario);
      this.carritoService.cargarCarrito();
    }
    
  }
}
