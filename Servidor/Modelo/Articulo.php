<?php
    class Articulo{
        private array $atributos = [];

        public function __construct(int $id, string $descripcion, string $nombre, string $precio, string $imagen, string $categoria, string $estado, int $stock)
        {
            $this->atributos['id']=$id;
            $this->atributos['descripcion']=$descripcion;
            $this->atributos['nombre']=$nombre;
            $this->atributos['precio']=$precio;
            $this->atributos['imagen']=$imagen;
            $this->atributos['categoria']=$categoria;
            $this->atributos['estado']=$estado;
            $this->atributos['stock']=$stock;
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