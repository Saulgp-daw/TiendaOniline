<?php
    namespace SegundoTrimestre\Tema05\Ejercicio01\Controlador;
    use SegundoTrimestre\Tema05\Ejercicio01\Modelo\Producto;
    use SegundoTrimestre\Tema05\Ejercicio01\Modelo\ModeloProducto;
    require_once("../Modelo/ModeloProducto.php");
    require_once("../Modelo/Producto.php");
    $pagActual=1; $tamPag=10;
    if(isset($_GET['pag'])){
        $pagActual = intval($_GET['pag']);
    }
    if(isset($_GET['tamPag'])){
        $pagActual = intval($_GET['tamPag']);
    }

    $numTotalPags = ceil(ModeloProducto::cantidadProductos()/$tamPag);
    if($pagActual > $numTotalPags){
        $pagActual = $numTotalPags;
    }

    if($pagActual < 1){
        $pagActual = 1;
    }

    $listaProductos = ModeloProducto::listaProductos($pagActual, $tamPag);
    $ultimoId = ModeloProducto::devolverUltimoId();
    require_once("../Vista/vistaProducto.php");



?>