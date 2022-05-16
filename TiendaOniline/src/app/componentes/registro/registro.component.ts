import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formularioDeRegistro: any;

  public resultadoRegistro: any;
  public resultadoLogin: any;

  constructor(public formulario: FormBuilder, private crudArticuloService: CrudArticulosService, private router: Router) {
    this.formularioDeRegistro = this.formulario.group({
      email: [''],
      contrasenha: [''],
      nombre: [''],
      apellidos: [''],
      direccion: [''],
      codigo_postal: [''],
      telefono_fijo: [''],
      pais: [''],
    });
  }

  ngOnInit(): void {
    document.getElementById("mensaje")!.className = "";
  }

  /**
   * la variable nuevo registro se ejecutará una vez el usuario envíe sus datos a nuestra base de datos, dependiendo de la respuesta
   * se le mostrará un mensaje con el resultado
   */
  async nuevoRegistro(): Promise<void> {

    document.querySelectorAll("input").forEach( input => {
      input.style.borderColor = "";
    });

    document.querySelectorAll(".mensaje_error").forEach( mensaje => {
      mensaje.remove();
    });
    
    if (this.validarCampos()) {
      this.resultadoRegistro = await lastValueFrom(this.crudArticuloService.agregarUsuario(this.formularioDeRegistro.value));
      this.mensajeDelServidor();
    }
  }

  validarCampos(): boolean {
    var email = document.getElementById("email");
    var contrasenha = document.getElementById("contrasenha");
    var confirmar_contrasenha = document.getElementById("confirmar_contrasenha");
    var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("apellidos");
    var direccion = document.getElementById("direccion");
    var codigo_postal = document.getElementById("codigo_postal");
    var telefono_fijo = document.getElementById("telefono_fijo");
    var pais = document.getElementById("pais");



    var mensaje = "";
    var camposValidos = true;
    if ((<HTMLInputElement>contrasenha).value != (<HTMLInputElement>confirmar_contrasenha).value || (<HTMLInputElement>contrasenha).value.trim() == "") {
      this.agregarMensajeError("mensaje_contrasenha", "Las contraseñas no coinciden o están vacías", contrasenha);
      camposValidos = false;
    }

    if (!(<HTMLInputElement>email).value.match(this.expresionesRegulares.expRegEmail)) {
      this.agregarMensajeError("mensaje_email", "El email no es válido", email);
      camposValidos = false;
    }
    if (!(<HTMLInputElement>nombre).value.match(this.expresionesRegulares.expRegNombreApellidos)) {
      this.agregarMensajeError("mensaje_nombre", "El nombre no es válido", nombre);
      camposValidos = false;
    }

    if (!(<HTMLInputElement>apellidos).value.match(this.expresionesRegulares.expRegNombreApellidos)) {
      this.agregarMensajeError("mensaje_apellidos", "Estos apellidos no son válidos", apellidos);
      camposValidos = false;
    }

    if ((<HTMLInputElement>direccion).value.trim() == "") {
      this.agregarMensajeError("mensaje_direccion", "Su dirección no puede quedar vacía", direccion);
      camposValidos = false;
    }

    if (!(<HTMLInputElement>codigo_postal).value.match(this.expresionesRegulares.expRegCP)) {
      this.agregarMensajeError("mensaje_cp", "El código postal es incorrecto", codigo_postal);
      camposValidos = false;
    }

    if (!(<HTMLInputElement>telefono_fijo).value.match(this.expresionesRegulares.expRegTelFijo)) {
      this.agregarMensajeError("mensaje_fijo", "El teléfono fijo es incorrecto", telefono_fijo);
      camposValidos = false;
    }

    if (!(<HTMLInputElement>telefono_fijo).value.match(this.expresionesRegulares.expRegTelFijo)) {
      this.agregarMensajeError("mensaje_fijo", "El teléfono fijo es incorrecto", telefono_fijo);
      camposValidos = false;
    }

    if ((<HTMLInputElement>pais).value.trim() == "") {
      this.agregarMensajeError("mensaje_pais", "No puede dejar el campo de país vacío", pais);
      camposValidos = false;
    }

    return camposValidos;
  }

  agregarMensajeError(idMensaje: string, mensaje: string, elementoErroneo: any) {
    var elemento = document.getElementById(idMensaje);
    elemento?.remove();
    var mensaje_error = document.createElement("p");
    mensaje_error.textContent = mensaje;
    mensaje_error.id = idMensaje;
    mensaje_error.style.color = "red";
    mensaje_error.className = "mensaje_error";
    this.insertAfter(mensaje_error, elementoErroneo);
    elementoErroneo.style.borderColor = "red";
  }

  insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);

  }

  mensajeDelServidor() {
    switch (this.resultadoRegistro.resultado) {
      case ("exito"):
        this.notificacionServidor("Usuario Registrado con éxito");
        //alert("Usuario Registrado con éxito");
        //this.router.navigate(["login"]);
        break;
      case ("campos_vacios"):
        this.notificacionServidor("Uno o más campos están vacíos");
        break;
      case ("usuario_existente"):
        this.notificacionServidor("Este usuario ya está registrado, inténtelo de nuevo");
        break;
      case ("num_argumentos"):
        this.notificacionServidor("El número de argumentos pasados es menor de lo posible");
        break;
    }
  }

  notificacionServidor(mensaje: string) {
    var notificacion = document.getElementById("notificacionesUsuario");
    notificacion!.className = "";
    notificacion!.innerHTML = "<h5>Respuesta: "+  mensaje+" </h5>";
    notificacion!.className = "mostrar";
    setTimeout(() => {
      notificacion!.className = "";
    }, 4000);
  }

  //Nuestras expresiones regulares
  readonly expresionesRegulares = {
    expRegNombreApellidos: "^[A-ZÁÉÍÓÚÑ][a-zA-Záéíóúñ ]+$",
    expRegCP: "^[0-4][0-9]{4}|5[0-2][0-9]{3}$",
    expRegEmail: "^.+@[a-z]+[\.][a-z]{2,3}$",
    expRegTelFijo: "^(9[0-9]{2}|8[0-9]{2}|91|81)[0-9]{6}$"
  }
}
