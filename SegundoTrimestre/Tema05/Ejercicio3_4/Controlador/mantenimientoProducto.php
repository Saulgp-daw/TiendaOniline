<?php
    namespace SegundoTrimestre\Tema05\Ejercicio3_4\Controlador;
    use SegundoTrimestre\Tema05\Ejercicio3_4\Modelo\Producto;
    use SegundoTrimestre\Tema05\Ejercicio3_4\Modelo\ModeloProducto;
    require_once("../Modelo/Producto.php");
    require_once("../Modelo/ModeloProducto.php");

    if(isset($_POST['Operacion'])){
        $operacion = $_POST['Operacion'];
        if($operacion == 'modificar' || $operacion == 'insertar') {
            $codigo = $_POST['codigo'];
            $descripcion = $_POST['descripcion'];
            $pcompra = $_POST['pcompra'];
            $pventa = $_POST['pventa'];
            $stock = $_POST['stock'];
            $producto = new Producto($codigo, $descripcion, $pcompra, $pventa, $stock);
            //$resultadoOperacion = ($operacion == 'modificar' ? ModeloProducto::actualizarProducto($producto) : ModeloProducto::insertarProducto($producto)); 
            if($operacion == 'modificar'){
                $resultadoOperacion = ModeloProducto::actualizarProducto($producto);
            }else{
                $resultadoOperacion = ModeloProducto::insertarProducto($producto);
            }
        }elseif($operacion=='eliminar'){
            $codigo = $_POST['codigo'];
            $resultadoOperacion = ModeloProducto::borrarProducto($codigo);
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