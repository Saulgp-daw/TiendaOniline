<?php
include_once("header.php");
/**
 * recogemos los valores enviados desde angular para tratar con los datos, comprobando antes si se encuentran datos en estos
 * llamaremos luego a la BBDD y dependiendo del resultado de la operación devolveremos un JSON.
 */
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $email = trim($request->email);
    $contrasenha = password_hash(trim($request->contrasenha), PASSWORD_BCRYPT);
    $nombre = trim($request->nombre);
    $apellidos = trim($request->apellidos);
    $direccion = trim($request->direccion);
    $codigo_postal = trim($request->codigo_postal);
    $telefono_fijo = trim($request->telefono_fijo);
    $pais = trim($request->pais);
    $resultadoOperacion = DB::registroUsuario($email, $contrasenha, $nombre, $apellidos,$direccion, $codigo_postal, $telefono_fijo, $pais);
    if($resultadoOperacion){
        echo '{ "resultado" : "'. $resultadoOperacion.'" }';
    }
    
}

?>