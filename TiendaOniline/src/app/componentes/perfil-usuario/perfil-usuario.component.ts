import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public resultadoRegistro: any;
  public resultadoLogin: any;

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

}
