<?php
namespace SegundoTrimestre\Tema05\Ejercicio01\Controlador;

use SegundoTrimestre\Tema05\Ejercicio01\Modelo\Producto;
use SegundoTrimestre\Tema05\Ejercicio01\Modelo\ModeloProducto;
require_once("../Modelo/Producto.php");
require_once("../Modelo/ModeloProducto.php");

    if($_POST){
        $id=$_POST['id'];
        $desc=$_POST['descripcion'];
        $nombre = $_POST['nombre'];
        $precio=$_POST['precio'];
        $imagen=$_POST['imagen'];
        $productoActualizado = new Producto($desc, $nombre, $precio, $imagen, $id);
        if(ModeloProducto::actualizarProducto($productoActualizado)){
            echo "{ 'resultado' : true }";
        }else{
            echo "{ 'resultado' : false }";
        }
    }   
  