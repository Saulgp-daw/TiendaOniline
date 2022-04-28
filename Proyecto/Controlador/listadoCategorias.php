<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET,POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    require_once("../Modelo/Articulo.php");
    require_once("../Modelo/DB.php");

    $listaDeCategorias = DB::devolverCategorias();
    require_once("../Vista/vistaCategorias.php");



?>