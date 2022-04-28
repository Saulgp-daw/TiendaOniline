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
        $cartasAleatorias = devolverAleatorio(1, 48, 10);
        $valoresCartas = [4, 11, 0, 10, 0, 0, 0, 0,0, 0, 2, 3];
        $resultado = 0;
        foreach ($cartasAleatorias as $carta) {
            $numCarta = $carta % 12;

            if($carta <= 12){
                $paloCarta = "bastos";
            }else if($carta <= 24){
                $paloCarta = "copas";
            }else if($carta <= 36){
                $paloCarta = "espadas";
            }else{
                $paloCarta = "oros";
            }

            $resultado += $valoresCartas[$numCarta];
            if($numCarta == 0){
                $numCarta = 12;
            }
            $imgSrc = ROOT_PATH . "/barajaEspa/$paloCarta/${paloCarta}${numCarta}.png";
            echo "<img height='170px' src='$imgSrc'/>";
        }
        echo "<span style='color: blue; font-size: 18pt;'>Puntuación: $resultado</span>";
    ?>
</body>
</html>