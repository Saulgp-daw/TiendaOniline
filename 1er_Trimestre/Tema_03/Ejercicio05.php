<?php
 /*Ejercicio 5 - Realiza un programa que muestre la fecha y hora actual usando las imágenes del
Ejercicio 2.*/

    require_once("../config.php");
    require_once("../utilidades/funcionesAuxiliares.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        table{
            display: inline-block;
            background-color: purple;
            margin: 10px;
        }
    </style>
    <title>Document</title>
</head>
<body>
    
</body>
</html>
<?php
/*
    $fecha = getdate();
    $dia = strval($fecha['mday']);
    $mes = strval($fecha['mon']);
    $anho = strval($fecha['year']);
    $hora = strval($fecha['hours']);
    $minutos = strval($fecha['minutes']);
    $segundos = strval($fecha['seconds']); 
*/

    mostrarFechaActual();
    mostrarHoraActual();
?>