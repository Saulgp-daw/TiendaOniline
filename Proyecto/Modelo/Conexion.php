<?php
// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "admin"; $contrasenia = "admin"; $nombreBaseDatos = "proyecto";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);
