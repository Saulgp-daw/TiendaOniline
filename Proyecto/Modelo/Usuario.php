<?php
    class Usuario{
        private array $atributos = [];

        public function __construct(string $email, string $contrasenha, string $nombre, string $apellidos, string $direccion, int $codigo_postal, int $telefono_fijo, string $pais)
        {
            $this->atributos['email']=$email;
            $this->atributos['contrasenha']=$contrasenha;
            $this->atributos['nombre']=$nombre;
            $this->atributos['apellidos']=$apellidos;
            $this->atributos['direccion']=$direccion;
            $this->atributos['codigo_postal']=$codigo_postal;
            $this->atributos['telefono_fijo']=$telefono_fijo;
            $this->atributos['pais']=$pais;
        }

        public function __get(string $atributo)
        {
            return $this->atributos[$atributo];
        }


        public function __set(string $atributo, $valor)
        {
            $this->atributos[$atributo]=$valor;
        }

        public function getAtributos(){
            return $this->atributos;
        }
    }



?>