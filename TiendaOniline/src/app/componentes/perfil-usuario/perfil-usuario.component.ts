import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
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

  constructor(public formulario: FormBuilder, private crudArticuloService: CrudArticulosService) { 
   
  }

  ngOnInit(): void {
    if(localStorage.getItem("usuarioConectado")){
      this.usuarioConectado = JSON.parse(localStorage.getItem("usuarioConectado")!);
    }
    console.log(this.usuarioConectado);
    this.cargarFormulario();
  }

  cargarFormulario():void{
    this.formularioDeModificacion = this.formulario.group({
      email:[this.usuarioConectado.email],
      contrasenha:[''],
      nombre:[this.usuarioConectado.nombre, [Validators.required, Validators.minLength(3)]],
      apellidos:[this.usuarioConectado.apellidos],
      direccion:[this.usuarioConectado.direccion],
      codigo_postal:[this.usuarioConectado.codigo_postal],
      telefono_fijo:[this.usuarioConectado.telefono_fijo],
      pais:[this.usuarioConectado.pais]
    });
  }

  async actualizarUsuario(): Promise<void>{
    //console.log(this.formularioDeModificacion.value);
    this.resultado = await lastValueFrom(this.crudArticuloService.actualizarUsuario(this.formularioDeModificacion.value));
    switch(this.resultado.resultado){
      case("exito"):
          alert("Datos modificados con éxito");
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
