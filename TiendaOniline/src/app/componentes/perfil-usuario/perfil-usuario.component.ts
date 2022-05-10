import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  public usuarioConectado: any;
  formularioDeModificacion: FormGroup;

  public resultadoRegistro: any;
  public resultadoLogin: any;

  constructor(public formulario: FormBuilder, private crudArticuloService: CrudArticulosService) { 
    this.formularioDeModificacion = this.formulario.group({
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
    if(localStorage.getItem("usuarioConectado")){
      this.usuarioConectado = JSON.parse(localStorage.getItem("usuarioConectado")!);
    }
   
  }

}
