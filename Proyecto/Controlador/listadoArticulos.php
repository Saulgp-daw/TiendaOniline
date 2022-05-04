<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET,POST, PUT, DELETE");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    require_once("../Modelo/Articulo.php");
    require_once("../Modelo/DB.php");

    $pagActual=1; $tamPag=10; $categoria="todos";
    if(isset($_GET['pag'])){
        $pagActual = intval($_GET['pag']);
    }
    if(isset($_GET['tamPag'])){
        $tamPag = intval($_GET['tamPag']);
    }

    if(isset($_GET['categoria'])){
        $categoria = $_GET['categoria'];
    }

    $numTotalPags = ceil(DB::cantidadArticulos()/$tamPag);
    if($pagActual > $numTotalPags){
        $pagActual = $numTotalPags;
    }

    if($pagActual < 1){
        $pagActual = 1;
    }

    $listaDeArticulos = DB::listaArticulos($pagActual, $tamPag, $categoria);
    require_once("../Vista/vistaArticulos.php");



?>