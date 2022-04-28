<?php 
require_once("../Controlador/autenticado.php");
require_once("../Modelo/FuncionesBD.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
</head>
<body>
    <?php
    
        $usuario = $_SESSION['usuario'];
        $datosUsuario = consulta($usuario);
        echo "<p> Nombre:". $datosUsuario['nombre'] . "</p>";
        echo "<p> Apellidos:". $datosUsuario['apellido1'] ." ".$datosUsuario['apellido2'] . "</p>";
        echo "<p> Usuario:". $datosUsuario['usuario'] . "</p>";
        echo "<p> Email:". $datosUsuario['email'] . "</p>";

    ?>
</body>
</html>