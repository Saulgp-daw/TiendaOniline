<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    require_once("../config.php");
    require_once(PROJECT_PATH . "/utilidades/funcionesAuxiliares.php");
    $repeticiones = 10;
    $i = 0;
    $listaIps = [];
    do {
        $ip = json_decode(file_get_contents("https://api.ipify.org?format=json"))->ip;
        if (!in_array($ip, $listaIps)) {
            array_push($listaIps, $ip);
        }
        sleep(1);
    } while (++$i < $repeticiones);
    tablaToHtml($listaIps);
    ?>
</body>

</html>