<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cookie</title>
</head>
<body>
<?php
    require("../utilidades/funcionesAuxiliares.php");
    $contador = lecturaContador();
    if($_COOKIE && isset($_COOKIE['timeStampUltimaVisita'])){
        $timeStamp = $_COOKIE['timeStampUltimaVisita'];
        $time = date('H:i:s', $timeStamp);
        $date = date('Y-m-d', $timeStamp);
        $visitasTranscurridas = $contador - intval($_COOKIE['numVisita'])-1;
        echo "La última visita tuya fue el día $date a la hora $time con la cantidad de $visitasTranscurridas";
    }else{
        echo "Hola, es la primera vez que me visitas";

    }
    setcookie("timeStampUltimaVisita",getdate()[0],time()+365*24*60*60); // guardamos el timestamp de la visita por un año
    setcookie("numVisita",$contador,time()+365*24*60*60); //ídem con el número de visita

?>
</body>
</html>