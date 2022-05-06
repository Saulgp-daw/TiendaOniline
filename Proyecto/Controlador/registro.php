<?php
include_once("header.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $email = trim($request->email);
    $contrasenha = trim($request->contrasenha);
    $nombre = trim($request->nombre);
    $apellidos = trim($request->apellidos);
    $direccion = trim($request->direccion);
    $codigo_postal = trim($request->codigo_postal);
    $telefono_fijo = trim($request->telefono_fijo);
    $pais = trim($request->pais);
    $resultadoOperacion = DB::registroUsuario($email, $contrasenha, $nombre, $apellidos,$direccion, $codigo_postal, $telefono_fijo, $pais);
    if($resultadoOperacion){
        echo '{ "resultado" : true }';
    }else{
        echo '{ "resultado" : false }';
    }
    
}

?>