<?php
    namespace SegundoTrimestre\Tema05\Ejercicio01\Controlador;
    use SegundoTrimestre\Tema05\Ejercicio01\Modelo\Producto;
    use SegundoTrimestre\Tema05\Ejercicio01\Modelo\ModeloProducto;
    require_once("../Modelo/Producto.php");
    require_once("../Modelo/ModeloProducto.php");

    if(isset($_POST['Operacion'])){
        $operacion = $_POST['Operacion'];
        if($operacion == 'modificar' || $operacion == 'insertar') {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $descripcion = $_POST['descripcion'];
            $precio = $_POST['precio'];
            $imagen = $_POST['imagen'];
            $producto = new Producto($descripcion, $nombre, $precio, $imagen, $id);
            //$resultadoOperacion = ($operacion == 'modificar' ? ModeloProducto::actualizarProducto($producto) : ModeloProducto::insertarProducto($producto)); 
            if($operacion == 'modificar'){
                $resultadoOperacion = ModeloProducto::actualizarProducto($producto);
            }else{
                $resultadoOperacion = ModeloProducto::insertarProducto($producto);
            }
        }elseif($operacion=='eliminar'){
            $id = $_POST['id'];
            $resultadoOperacion = ModeloProducto::borrarProducto($id);
        }else{
            echo '{ "resultado" :', $operacion ,' desconocida. }';
        }

        if($resultadoOperacion){
            echo '{ "resultado" : true }';
        }else{
            echo '{ "resultado" : false }';
        }
    }



?>