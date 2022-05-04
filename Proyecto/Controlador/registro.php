<?php
    include_once("header.php");
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $contrasenha = $data->contrasenha;
    $nombre = $data->nombre;
    $apellidos = $data->apellidos;
    $direccion = $data->direccion;
    $codigo_postal = $data->codigo_postal;
    $telefono_fijo = $data->telefono_fijo;
    $pais = $data->pais;
    $result = DB::registroUsuario($email, $contrasenha, $nombre, $apellidos, $direccion, $codigo_postal, $telefono_fijo, $pais);
    


?>