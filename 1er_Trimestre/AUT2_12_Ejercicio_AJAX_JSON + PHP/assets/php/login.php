<?php
header('Content-Type: application/json'); // Dijo que es por JSON
sleep(2); // Que espere 2 segundos 
$usuario = filter_input(INPUT_POST, 'usuario'); // Obtengo el input usuario
$contrasenia = filter_input(INPUT_POST, 'contrasenia'); // Obtengo el input contraseña
if ($usuario == "saul" && $contrasenia == "1234") { // Si el usuario y la contraseña son iguales 
    $validacion = true; // validacion es true
}else{
    $validacion = false;
}
echo json_encode([ // Y esto es lo que se envia de php 
    'usuario' => $usuario,
    'validacion' => $validacion
]);
?>