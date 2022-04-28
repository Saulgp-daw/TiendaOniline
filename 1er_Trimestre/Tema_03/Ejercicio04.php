<?php
/*Ejercicio 4 - Lo mismo que el ejercicio 2, pero mostrando los números con las imágenes del
ejercicio anterior.*/

    require_once("../utilidades/funcionesAuxiliares.php");
    require_once("../config.php");

    function primitiva(){
        $numeros = [];
        
        while(count($numeros) < 6 ){
            $n = rand(1, 49);
            if(!in_array($n, $numeros)){
                array_push($numeros, $n);
            }
            sort($numeros);
        }
        return $numeros;
    }

    $numeros = primitiva();
    
    foreach ($numeros as $num) {
        if($num < 10){
            mostrarImgNum(strval($num));
            //echo "<img src='" . ROOT_PATH ."/imgNumeros/" . $num . ".png' height='40px'>";
        }else{
            $sNum = strval($num);
            mostrarImgNum($sNum[0]);
            mostrarImgNum($sNum[1]);

        }
        
    }

    echo "<br>Hoy es " . date("Y/m/d") . "<br>";
    echo "Con la hora " . date("H:i:sa");
    
    
?>

