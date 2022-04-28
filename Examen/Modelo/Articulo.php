<?php
    class Articulo{
        private array $atributos = [];

        public function __construct(int $id, string $titulo, string $fecha, string $contenido)
        {
            $this->atributos['id']=$id;
            $this->atributos['titulo']=$titulo;
            $this->atributos['fecha']=$fecha;
            $this->atributos['contenido']=$contenido;
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