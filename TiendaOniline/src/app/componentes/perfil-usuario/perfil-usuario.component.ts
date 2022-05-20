import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  public usuarioConectado: any;
  formularioDeModificacion: any;
  public resultado: any;

  constructor(public formulario: FormBuilder, private crudArticuloService: CrudArticulosService, private servicioCarrito: CarritoService, private router: Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("usuarioConectado")) {
      this.usuarioConectado = JSON.parse(localStorage.getItem("usuarioConectado")!);
    }
    this.cargarFormulario();
  }

  cargarFormulario(): void {
    this.formularioDeModificacion = this.formulario.group({
      email: [this.usuarioConectado.email],
      contrasenha: [''],
      nombre: [this.usuarioConectado.nombre, [Validators.required, Validators.minLength(3)]],
      apellidos: [this.usuarioConectado.apellidos],
      direccion: [this.usuarioConectado.direccion],
      codigo_postal: [this.usuarioConectado.codigo_postal],
      telefono_fijo: [this.usuarioConectado.telefono_fijo],
      pais: [this.usuarioConectado.pais]
    });
  }

  async actualizarUsuario(): Promise<void> {

    document.querySelectorAll("input").forEach(input => {
      input.style.borderColor = "";
    });

    document.querySelectorAll(".mensaje_error").forEach(mensaje => {
      mensaje.remove();
    });

    if (this.validarCampos()) {
      this.resultado = await lastValueFrom(this.crudArticuloService.actualizarUsuario(this.formularioDeModificacion.value));
      var usuario = await lastValueFrom(this.crudArticuloService.devolverUsuario(this.usuarioConectado.email));
      console.log(usuario);
      this.servicioCarrito.setUsuario(usuario);
      this.mensajeDelServidor();
    }
  }

  async borrarCuenta(): Promise<void> {
    if (this.validarCampos()) {
      this.resultado = await lastValueFrom(this.crudArticuloService.borrarUsuario(this.formularioDeModificacion.value));
      this.mensajeDelServidor();
    }
  }

  finalizarSesion(): void {
    this.servicioCarrito.limpiarSesion();
    this.servicioCarrito.cargarCarrito();
  }

  mensajeDelServidor() {
    switch (this.resultado.resultado) {
      case("exito"):
        this.notificacionServidor("Modificacíon finalizada con éxito");
        break;
      case ("borrado_exito"):
        this.notificacionServidor("Usuario eliminado con éxito");
        this.finalizarSesion();
        setTimeout(() => {
          this.router.navigate(["home"]);
        }, 2000);
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
      case ("contrasenha_incorrecta"):
        this.notificacionServidor("La contraseña proporcionada no es la correcta");
        break;
    }
  }

  notificacionServidor(mensaje: string) {
    var notificacion = document.getElementById("notificacionesUsuario");
    notificacion!.className = "";
    notificacion!.innerHTML = "<h5>" + mensaje + " </h5>";
    notificacion!.className = "mostrar";
    setTimeout(() => {
      notificacion!.className = "";
    }, 3000);
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
      this.agregarMensajeError("mensaje_nombre", "El nombre debe tener la primera letra mayúscula y no tener números", nombre);
      camposValidos = false;
    }

    if (!(<HTMLInputElement>apellidos).value.match(this.expresionesRegulares.expRegNombreApellidos)) {
      this.agregarMensajeError("mensaje_apellidos", "Los apellidos deben tener la primera letra mayúscula y no tener números", apellidos);
      camposValidos = false;
    }

    if ((<HTMLInputElement>direccion).value.trim() == "") {
      this.agregarMensajeError("mensaje_direccion", "Su dirección no puede quedar vacía", direccion);
      camposValidos = false;
    }

    if (!(<HTMLInputElement>codigo_postal).value.match(this.expresionesRegulares.expRegCP)) {
      this.agregarMensajeError("mensaje_cp", "El código postal es incorrecto. Deben ser 5 cifras", codigo_postal);
      camposValidos = false;
    }

    if (!(<HTMLInputElement>telefono_fijo).value.match(this.expresionesRegulares.expRegTelFijo)) {
      this.agregarMensajeError("mensaje_fijo", "El teléfono fijo es incorrecto. Deben ser 9 números", telefono_fijo);
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
    mensaje_error.style.color = "rgba(239, 12, 127, 1)";
    mensaje_error.className = "mensaje_error";
    this.insertAfter(mensaje_error, elementoErroneo);
    elementoErroneo.style.borderColor = "rgba(239, 12, 127, 1)";
  }

  insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }



  //Nuestras expresiones regulares
  readonly expresionesRegulares = {
    expRegNombreApellidos: "^[A-ZÁÉÍÓÚÑ][a-zA-Záéíóúñ ]+$",
    expRegCP: "^[0-4][0-9]{4}|5[0-2][0-9]{3}$",
    expRegEmail: "^.+@[a-z]+[\.][a-z]{2,3}$",
    expRegTelFijo: "^(9[0-9]{2}|8[0-9]{2}|91|81)[0-9]{6}$"
  }
}
