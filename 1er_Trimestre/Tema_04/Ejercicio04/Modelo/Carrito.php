<?php
    require_once("Producto.php");
    class Carrito{
        private $listaProductos = [];

        public function __construct($listaProductos = [])
        {
            $this->listaProductos = $listaProductos;
        }

        public function getListaProductos(){
            return $this->listaProductos;
        }

        public function productoEstaEnCarro(int $codBarras){
            return isset($listaProductos[$codBarras]);
        }

        public function agregarProducto(Producto $producto){
            if($this->productoEstaEnCarro($producto->codBarras)){
                $producto->cantidad++;
            }else{

                $producto->cantidad = 1;
                $listaProductos[$producto->codBarras] = $producto;
            }
        }

        public function quitarProducto(int $codBarras){
            if($this->productoEstaEnCarro($codBarras)){
                unset($listaProductos[$codBarras]);
            }
        }

        public function obtenerPrecioTotal(){
            $suma = 0;
            foreach ($this->listaProductos as $producto) {
                $suma += $producto->cantidad * $producto->precio;
            }
            return $suma;
        }




    }


?>