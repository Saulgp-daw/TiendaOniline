<?php
    class Producto {
        private $atributos = ['codBarras' => 0, 'nombre'=>null, 'detalles'=>null, 'precio'=>0, 'imagen'=>null];
        private static $numProducto = 0;

        public function __construct(string $nombre, string $detalles, float $precio, string $imagen, $codBarras = null )
        {
            if($codBarras == null){
                $this->atributos['codBarras'] = Producto::$numProducto++;
            }else{
                $this->atributos['codBarras'] = $codBarras;
            }
            $this->atributos['nombre'] = $nombre;
            $this->atributos['detalles'] = $detalles;
            $this->atributos['precio'] = $precio;
            $this->atributos['imagen'] = $imagen;
        }
        
        //si tienen doble guión bajo se trata de un método "mágico"
        public function __set($atributo, $valor){
            $this->atributos[$atributo] = $valor;
        }

        public function __get($atributo){
            return $this->atributos[$atributo];
        }

        public function __toString(){
            ob_start();
            print_r($this->atributos);
            $content = ob_get_contents();
            ob_end_clean();
            return $content;
        }

    }
/*
    $p = new Producto("TV", "Smart tv de 22\"", 233.4, "ewrerewrewr.jpg");
    //con el método mágico y un array asociativo con los atributos, si metemos un atributo que no se encuentra en el array estaríamos creando una propiedad nueva (similar a JS)
    $p->cantidad = 5;
    $p->precio = $p->precio+1;
    echo $p;
*/

?>