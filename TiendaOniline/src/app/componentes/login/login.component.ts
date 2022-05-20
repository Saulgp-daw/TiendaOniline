import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  public resultadoLogin: any;
  public usuario!: Usuario;

  /**
   * Hacemos uso del módulo de angular llamado 'FormGroup' y 'FormBuilder' para recoger/inicializar los datos de los inputs
   * @param formulario 
   * @param crudArticuloService 
   * @param carritoService 
   * @param router 
   */
  constructor(public formulario: FormBuilder, private crudArticuloService: CrudArticulosService, private carritoService: CarritoService, private router: Router) { 
    this.formularioLogin = this.formulario.group({
      email:[''],
      contrasenha:['']
    });
  }

  ngOnInit(): void {
  }

  /**
   * Hacemos uso de un promise y async, para esperar a recibir el resultado que nos devolverá el servicio, dependiendo del resultado que
   * nos devuelva el servidor, notificaremos al usuario o haremos un login exitoso
   */
  async nuevoLogin(): Promise<void>{
    this.resultadoLogin = await lastValueFrom(this.crudArticuloService.comprobarLogin(this.formularioLogin.value));
    this.usuario = this.resultadoLogin;
    if(this.resultadoLogin.resultado == "not_found"){
      this.notificacionServidor("Usuario o contraseña incorrectos");
    }else{
      this.carritoService.setUsuario(this.usuario);
      this.carritoService.cargarCarrito();
      this.router.navigate(["tienda/categoria/todos/1"]);
    }
  }

  /**
   * 
   * @param mensaje Recibirá un string con el mensaje que se desea mostrar, buscaremos en el DOM el id 'notificacionesUsuario' y cambiaremos su 
   * nombre de clase a mostrar
   */
  notificacionServidor(mensaje: string) {
    var notificacion = document.getElementById("notificacionesUsuario");
    notificacion!.className = "";
    notificacion!.innerHTML = "<h5>"+  mensaje+" </h5>";
    notificacion!.className = "mostrar";
    setTimeout(() => {
      notificacion!.className = "";
    }, 3000);
  }
}
