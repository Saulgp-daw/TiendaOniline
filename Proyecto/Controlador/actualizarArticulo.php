<?php
    require_once("header.php");
    if(isset($_GET['id']) && isset($_GET['cantidad'])){
        $id = intval($_GET['id']);
        $cantidad = intval($_GET['cantidad']);
        $respuesta = DB::actualizarArticulo($id, $cantidad);
        echo '{"filas_actualizadas": "'.$respuesta.'"}';
    }





?>