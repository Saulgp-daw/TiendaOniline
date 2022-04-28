<?php
    require_once("../Modelo/Articulo.php");
    require_once("../Modelo/BlogDB.php");

    $pagActual=1; $tamPag=5;
    if(isset($_GET['pag'])){
        $pagActual = intval($_GET['pag']);
    }
    if(isset($_GET['tamPag'])){
        $tamPag = intval($_GET['tamPag']);
    }

    $numTotalPags = ceil(BlogDB::cantidadArticulos()/$tamPag);
    if($pagActual > $numTotalPags){
        $pagActual = $numTotalPags;
    }

    if($pagActual < 1){
        $pagActual = 1;
    }

    $listaDeArticulos = BlogDB::listaArticulos($pagActual, $tamPag);

    require_once("../Vista/vistaArticulos.php");



?>