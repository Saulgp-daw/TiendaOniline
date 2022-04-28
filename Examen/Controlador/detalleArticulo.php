<?php
    require_once("../Modelo/Articulo.php");
    require_once("../Modelo/BlogDB.php");

    if(isset($_GET['id'])){
        $id = intval($_GET['id']);
    }

    $articulo = BlogDB::devolverArticulo($id);

    require_once("../Vista/vistaDetalleArticulo.php");




?>