<?php
namespace SegundoTrimestre\Tema05\Ejercicio01\Modelo;
use Exception;

    class Producto{
        private array $atributos = [];

        public function __construct(string $descripcion, string $nombre, float $precio, string $imagen, int $id=null)
        {
            if(!$this->validarCadenas($descripcion, $nombre, $imagen)){
                throw new Exception("Error al crear el producto");
            }
            $this->atributos['id']=$id;
            $this->atributos['descripcion']=$descripcion;
            $this->atributos['nombre']=$nombre;
            $this->atributos['precio']=$precio;
            $this->atributos['imagen']=$imagen;
        }

        public function validarCadenas(...$s):bool{
            foreach($s as $cad){
                if($cad==null || $cad=""){
                    return false;
                }
            }
            return true;
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