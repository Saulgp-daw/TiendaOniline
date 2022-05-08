<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET,POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    require_once("../Modelo/Articulo.php");
    require_once("../Modelo/DB.php");

    if(isset($_GET['id'])){
        $id = intval($_GET['id']);
    }

    $articulo = json_encode(DB::devolverArticulo($id)) ;
    require_once("../Vista/vistaArticuloUnico.php");



?>