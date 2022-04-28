<?php
namespace SegundoTrimestre\Tema05\Ejercicio3_4\Modelo;
use Exception;

    class Producto{
        private array $atributos = [];

        public function __construct(string $codigo, string $descripcion, float $pcompra, float $pventa, int $stock)
        {
            if(!$this->validarCadenas($descripcion)){
                throw new Exception("Error al crear el producto");
            }
            $this->atributos['codigo']=$codigo;
            $this->atributos['descripcion']=$descripcion;
            $this->atributos['pcompra']=$pcompra;
            $this->atributos['pventa']=$pventa;
            $this->atributos['stock']=$stock;
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