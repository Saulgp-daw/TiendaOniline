<?php
header('Content-Type: application/json'); // Dijo que es por JSON
$usuario = filter_input(INPUT_GET, 'usuario'); // Obtengo el input usuario
$contrasenia = filter_input(INPUT_GET, 'contrasenia'); // Obtengo el input contraseña
if ($usuario == "admin" && $contrasenia == "admin") { // Si el usuario y la contraseña son iguales 
    $validacion = true; // validacion es true
}else{
    $validacion = false;
}
echo json_encode([ // Y esto es lo que se envia de php 
    'usuario' => $usuario,
    'validacion' => $validacion
]);
?>